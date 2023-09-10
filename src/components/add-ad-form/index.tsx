import React, { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { SubmitHandler, useForm } from 'react-hook-form';

import plug from '../../assets/add_ad_photo_plug.jpg';
import { useAppSelector } from '../../redux/hooks';
import { useAddAdMutation } from '../../redux/services/ads/adsApi';
import { isFetchBaseQueryError, isErrorWithMessage } from '../../redux/services/helpers';
import { selectUser } from '../../redux/slices/userSlice';
import loadingTextBtn from '../../utils/funcs/loadingTextBtn';
import CustomButton from '../custom-button';
import { landCategories } from '../filters/filter-by-prop-list/land-category-filter/options';
import { landUse } from '../filters/filter-by-prop-list/land-use-filter/options';
import { rents } from '../filters/filter-by-prop-list/rent-filter/options';
import * as S from './styles';
import FormValues from './types';

const AddAdForm = () => {
  const { userInfo } = useAppSelector(selectUser);
  const [addAdv, { isError, isLoading: isAdding }] = useAddAdMutation();
  const [cookies] = useCookies(['token']);

  const {
    formState: { errors },
    formState,
    handleSubmit,
    register,
    reset,
  } = useForm<FormValues>({ mode: 'all' });

  const maxCountAdImages = 10;

  const hiddenFileInputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [isPlusFile, setIsPlusFile] = useState<boolean>(true);
  const [isErrorFiles, setIsErrorFiles] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [addAdError, setAddAdError] = useState<string>('');

  const fileInputHandleClick = () => {
    if (hiddenFileInputRef.current) {
      hiddenFileInputRef.current.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;

    if (target.files) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const filesArr: File[] = [...(target.files as any)];

      if (target.files.length > maxCountAdImages) {
        setIsErrorFiles(true);
      } else {
        setIsErrorFiles(false);

        if (files.length < maxCountAdImages) {
          setFiles((prev) => prev.concat(filesArr));

          const filesObjectURLArr = filesArr.map((file) => URL.createObjectURL(file));

          const previewImagesCount = previewImages.length + filesArr.length;

          if (previewImagesCount > maxCountAdImages) {
            setPreviewImages(filesObjectURLArr);
          } else {
            setPreviewImages((prev) => prev.concat(filesObjectURLArr));
          }

          if (previewImagesCount === maxCountAdImages) {
            setIsPlusFile(false);
          }
        } else {
          setFiles(filesArr);
        }
      }

      if (previewImages.length === maxCountAdImages) {
        setIsPlusFile(false);
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const previewImageHandleDelete = (e: any) => {
    const { target } = e;

    // console.log('files', files);
    // console.log('previewImages', previewImages);

    if (target) {
      const filterPreviewImages = previewImages.filter((img) => String(img) !== String(target.src));

      const filterFiles = files.filter(
        (_file, index) => previewImages.indexOf(target.src) !== index,
      );

      // console.log('filterFiles', filterFiles);
      // console.log('filterPreviewImages', filterPreviewImages);

      setPreviewImages(filterPreviewImages);
      setFiles(filterFiles);

      if (filterPreviewImages.length < maxCountAdImages) {
        setIsPlusFile(true);
      } else {
        setIsPlusFile(false);
      }
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // eslint-disable-next-line no-console
    console.log(data);

    const formData = new FormData();

    if (userInfo) {
      formData.append('userId', userInfo.id.toString());
    }

    if (files.length) {
      files.forEach((file) => {
        formData.append('photos', file);
      });
    }

    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }

    try {
      await addAdv({ data: formData, token: cookies.token })
        .unwrap()
        .catch((error) => {
          setAddAdError(error.data.message);
        });
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const errMsg = 'error' in err ? err.error : JSON.stringify(err.data);
        setAddAdError(errMsg);
      } else if (isErrorWithMessage(err)) {
        setAddAdError(err.message);
      }
    }
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.InputWrapper>
        <label>Название</label>
        <S.Input
          type='text'
          {...register('title', {
            required: 'Введите название',
          })}
        />
        {errors.title && <S.ErrorFormMsg>{errors.title.message}</S.ErrorFormMsg>}
      </S.InputWrapper>
      <S.InputWrapper>
        <label>Площадь, Га</label>
        <S.Input
          type='number'
          {...register('area', {
            min: {
              message: 'Не может быть меньше 0',
              value: 0,
            },
            required: 'Введите площадь',
            valueAsNumber: true,
          })}
        />
        {errors.area && <S.ErrorFormMsg>{errors.area.message}</S.ErrorFormMsg>}
      </S.InputWrapper>
      <S.InputWrapper>
        <label>Цена, ₽</label>
        <S.Input
          type='number'
          {...register('price', {
            min: {
              message: 'Не может быть меньше 0',
              value: 0,
            },
            required: 'Введите цену',
            valueAsNumber: true,
          })}
        />
        {errors.price && <S.ErrorFormMsg>{errors.price.message}</S.ErrorFormMsg>}
      </S.InputWrapper>
      <S.InputWrapper>
        <label>Описание</label>
        <S.TextArea
          rows={5}
          {...register('description', {
            required: false,
          })}
        />
        {errors.description && <S.ErrorFormMsg>{errors.description.message}</S.ErrorFormMsg>}
      </S.InputWrapper>
      <S.InputWrapper>
        <label>Адрес</label>
        <S.Input
          type='text'
          {...register('address', {
            required: 'Введите адрес',
          })}
        />
        {errors.address && <S.ErrorFormMsg>{errors.address.message}</S.ErrorFormMsg>}
      </S.InputWrapper>

      <S.Fieldset>
        <legend>Категория земель</legend>
        {landCategories.map((category) => (
          <S.FieldsetInputWrapper key={category.value}>
            <input
              type='radio'
              value={category.value}
              {...register('land_category', {
                required: 'Выберите хотя бы один пункт',
              })}
            />
            <span>{category.title}</span>
          </S.FieldsetInputWrapper>
        ))}
        {errors.land_category && <S.ErrorFormMsg>{errors.land_category.message}</S.ErrorFormMsg>}
      </S.Fieldset>

      <S.Fieldset>
        <legend>Землепользование</legend>
        {landUse.map((category) => (
          <S.FieldsetInputWrapper key={category.value}>
            <input
              type='radio'
              value={category.value}
              {...register('land_use', {
                required: 'Выберите хотя бы один пункт',
              })}
            />
            <span>{category.title}</span>
          </S.FieldsetInputWrapper>
        ))}
        {errors.land_use && <S.ErrorFormMsg>{errors.land_use.message}</S.ErrorFormMsg>}
      </S.Fieldset>

      <S.Fieldset>
        <legend>Права собственности</legend>
        {rents.map((rent) => (
          <S.FieldsetInputWrapper key={rent.value}>
            <input
              type='radio'
              value={rent.value}
              {...register('is_rent', {
                required: 'Выберите хотя бы один пункт',
              })}
            />
            <span>{rent.title}</span>
          </S.FieldsetInputWrapper>
        ))}
        {errors.is_rent && <S.ErrorFormMsg>{errors.is_rent.message}</S.ErrorFormMsg>}
      </S.Fieldset>

      <S.InputWrapper>
        <label htmlFor='ad-photo'>Фотографии объявления</label>
        <span style={{ color: '#0000004D' }}>Не более 10 фотографий</span>
        <S.FormInputFile
          id='ad-photo'
          type='file'
          accept='image/*'
          ref={hiddenFileInputRef}
          onChange={handleChange}
          multiple
        />

        <S.AdvImagesWrapper>
          {previewImages &&
            previewImages.map((url) => (
              <S.PreviewAdvImageWrapper key={url} onClick={previewImageHandleDelete}>
                <S.PreviewAdvImage src={url} alt='Фото объявления' />
              </S.PreviewAdvImageWrapper>
            ))}

          {isPlusFile && (
            <div onClick={fileInputHandleClick}>
              <S.PlusIcon src={plug} alt='Добавить изображение' />
            </div>
          )}
        </S.AdvImagesWrapper>
        {isErrorFiles && <S.ErrorFormMsg>Загрузите до 10 фотографий</S.ErrorFormMsg>}
      </S.InputWrapper>

      <CustomButton type='submit' variant='outlined' disabled={isAdding}>
        {isAdding ? loadingTextBtn : 'Добавить объявление'}
      </CustomButton>

      {isError && <S.ErrorFormMsg>{addAdError}</S.ErrorFormMsg>}
    </S.Form>
  );
};

export default AddAdForm;
