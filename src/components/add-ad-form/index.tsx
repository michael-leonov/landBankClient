import React, { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { AddressSuggestions, DaDataAddress, DaDataSuggestion } from 'react-dadata';
import { SubmitHandler, useForm } from 'react-hook-form';

import plug from '../../assets/add_ad_photo_plug.jpg';
import { useAppSelector } from '../../redux/hooks';
import { useAddAdMutation } from '../../redux/services/ads/adsApi';
import { isFetchBaseQueryError, isErrorWithMessage } from '../../redux/services/helpers';
import { selectUser } from '../../redux/slices/userSlice';
import { irrigations, landCategories, landUse, rents, survey, typeOfUse } from '../../utils/consts';
import loadingTextBtn from '../../utils/funcs/loadingTextBtn';
import CustomButton from '../custom-button';
import SubmitingForm from '../submiting-form';
import * as S from './styles';
import FormValues from './types';

import 'react-dadata/dist/react-dadata.css';

const AddAdForm = () => {
  const { userInfo } = useAppSelector(selectUser);
  const [addAd, { isError, isLoading: isAdding }] = useAddAdMutation();
  const [cookies] = useCookies(['token']);

  const {
    formState: { errors },
    formState,
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<FormValues>({ mode: 'all' });

  const watchRent = watch('is_rent');
  const watchTypeOfUse = watch('type_of_use');

  const maxCountAdImages = 10;

  const hiddenFileInputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [isPlusFile, setIsPlusFile] = useState<boolean>(true);
  const [isErrorFiles, setIsErrorFiles] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [addAdError, setAddAdError] = useState<string>('');

  const [addressValue, setAddressValue] = useState<DaDataSuggestion<DaDataAddress> | undefined>();
  const [addressError, setAddressError] = useState<string>('');

  const [isArableUse, setIsArableUse] = useState<boolean>(false);

  const arableUseChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setIsArableUse(JSON.parse(e.target.value));

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
            setFiles(filesArr);
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

    if (target) {
      const filterPreviewImages = previewImages.filter(
        (img) => String(img) !== String(target.children[0].src),
      );

      const filterFiles = files.filter(
        (_file, index) => previewImages.indexOf(target.children[0].src) !== index,
      );

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
    const formData = new FormData();

    // eslint-disable-next-line no-console
    console.log(data);

    if (addressValue) {
      formData.append('address', addressValue.value);
      formData.append('region_kladr_id', addressValue.data.region_kladr_id);

      if (addressValue.data.geo_lat && addressValue.data.geo_lon) {
        formData.append('geo_lat', addressValue.data.geo_lat);
        formData.append('geo_lon', addressValue.data.geo_lon);
      }
    } else {
      setAddressError('Адрес некорректный, уточните данные');
      return false;
    }

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
      await addAd({ data: formData, token: cookies.token })
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
        <label>Название*</label>
        <S.Input
          type='text'
          placeholder='Участок 2 гектара'
          {...register('title', {
            required: 'Введите название',
          })}
        />
        {errors.title && <S.ErrorFormMsg>{errors.title.message}</S.ErrorFormMsg>}
      </S.InputWrapper>
      <S.InputWrapper>
        <label>
          Адрес* <span>(выберите из списка после ввода)</span>
        </label>
        <AddressSuggestions
          token={process.env.REACT_APP_DADATA_TOKEN as string}
          value={addressValue}
          onChange={setAddressValue}
          delay={2000}
          customInput={S.Input}
          inputProps={{
            onChange: () => setAddressError(''),
            placeholder: 'Ставропольский край, Ставрополь, Нижняя улица, 47',
          }}
        />
        {addressError && <S.ErrorFormMsg>{addressError}</S.ErrorFormMsg>}
      </S.InputWrapper>

      <S.InputWrapper>
        <label>Кадастровый номер</label>

        <S.Input type='text' placeholder='' {...register('cadastral_number')} />
      </S.InputWrapper>
      <S.InputWrapper>
        <label>Площадь, Га*</label>
        <S.Input
          type='number'
          placeholder='2'
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
        <label>Цена, ₽*</label>
        <S.Input
          type='number'
          placeholder='10000000'
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
          placeholder='Продам земельный участок 2 гектара...'
          {...register('description', {
            required: false,
          })}
        />
        {errors.description && <S.ErrorFormMsg>{errors.description.message}</S.ErrorFormMsg>}
      </S.InputWrapper>

      <S.Fieldset>
        <legend>Категория земель*</legend>
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
        <legend>Землепользование*</legend>
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
        <legend>Вид использования*</legend>
        {typeOfUse.map((type) => (
          <S.FieldsetInputWrapper key={type.value}>
            <input
              type='radio'
              value={type.value}
              {...register('type_of_use', {
                required: 'Выберите хотя бы один пункт',
              })}
            />
            <span>{type.title}</span>
          </S.FieldsetInputWrapper>
        ))}
        {watchTypeOfUse === 'arable' && (
          <S.Fieldset>
            <legend>Используется ли?</legend>
            <S.FieldsetInputWrapper>
              <input
                type='radio'
                name='arableUse'
                value={'true'}
                onChange={arableUseChangeHandler}
              />
              <span>Используется</span>
            </S.FieldsetInputWrapper>
            {isArableUse && (
              <S.InputWrapper>
                <label>Выращиваемая культура</label>
                <S.Input type='text' placeholder='пшеница' {...register('cultivated_crop')} />
              </S.InputWrapper>
            )}
            <S.FieldsetInputWrapper>
              <input
                type='radio'
                name='arableUse'
                value={'false'}
                onChange={arableUseChangeHandler}
              />
              <span>Не используется</span>
            </S.FieldsetInputWrapper>
          </S.Fieldset>
        )}
        {errors.type_of_use && <S.ErrorFormMsg>{errors.type_of_use.message}</S.ErrorFormMsg>}
      </S.Fieldset>

      <S.Fieldset>
        <legend>Права собственности*</legend>
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
        {watchRent === 'true' && (
          <S.InputWrapper>
            <label>
              <span style={{ fontWeight: '400' }}>Срок аренды*</span>
            </label>
            <S.InputMasked
              mask='99.99.2099'
              type='text'
              placeholder='31.01.2024'
              {...register('rent_period', {
                required: 'Введите дату',
              })}
            />
          </S.InputWrapper>
        )}
        {errors.rent_period && <S.ErrorFormMsg>{errors.rent_period.message}</S.ErrorFormMsg>}
      </S.Fieldset>

      <S.Fieldset>
        <legend>Орошение*</legend>
        {irrigations.map((irrigation) => (
          <S.FieldsetInputWrapper key={irrigation.value}>
            <input
              type='radio'
              value={irrigation.value}
              {...register('irrigation', {
                required: 'Выберите хотя бы один пункт',
              })}
            />
            <span>{irrigation.title}</span>
          </S.FieldsetInputWrapper>
        ))}
        {errors.irrigation && <S.ErrorFormMsg>{errors.irrigation.message}</S.ErrorFormMsg>}
      </S.Fieldset>

      <S.Fieldset>
        <legend>Межевание*</legend>
        {survey.map((survey) => (
          <S.FieldsetInputWrapper key={survey.value}>
            <input
              type='radio'
              value={survey.value}
              {...register('survey', {
                required: 'Выберите хотя бы один пункт',
              })}
            />
            <span>{survey.title}</span>
          </S.FieldsetInputWrapper>
        ))}
        {errors.irrigation && <S.ErrorFormMsg>{errors.irrigation.message}</S.ErrorFormMsg>}
      </S.Fieldset>

      <S.InputWrapper>
        <label htmlFor='ad-photo'>Фотографии объявления</label>
        <span style={{ color: '#0000004D' }}>Не более {maxCountAdImages} фотографий</span>
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
        {isErrorFiles && (
          <S.ErrorFormMsg>Загрузите до {maxCountAdImages} фотографий</S.ErrorFormMsg>
        )}
      </S.InputWrapper>

      <CustomButton type='submit' variant='outlined' disabled={isAdding}>
        {isAdding ? loadingTextBtn : 'Добавить объявление'}
      </CustomButton>

      {isError && <S.ErrorFormMsg>{addAdError}</S.ErrorFormMsg>}
      <SubmitingForm loading={isAdding} />
    </S.Form>
  );
};

export default AddAdForm;
