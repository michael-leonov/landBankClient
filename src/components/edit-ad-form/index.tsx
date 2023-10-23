/* eslint-disable camelcase */
import React, { useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { SubmitHandler, useForm } from 'react-hook-form';

import plug from '../../assets/add_ad_photo_plug.jpg';
import { useAppSelector } from '../../redux/hooks';
import { useEditAdMutation } from '../../redux/services/ads/adsApi';
import { isFetchBaseQueryError, isErrorWithMessage } from '../../redux/services/helpers';
import { selectUser } from '../../redux/slices/userSlice';
import {
  irrigations,
  landCategories,
  landUse,
  myDomain,
  rents,
  survey,
  typeOfUse,
} from '../../utils/consts';
import loadingTextBtn from '../../utils/funcs/loadingTextBtn';
import AdDetailsProps from '../ad-details/interface';
import * as S from '../add-ad-form/styles';
import FormValues from '../add-ad-form/types';
import CustomButton from '../custom-button';
import * as Styled from './styles';

const EditAdForm = ({ ad }: AdDetailsProps) => {
  const { userInfo } = useAppSelector(selectUser);
  const [editAd, { isError, isLoading: isUpdating }] = useEditAdMutation();
  const [cookies] = useCookies(['token']);

  const {
    formState: { errors },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState,
    handleSubmit,
    register,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      address: ad?.address,
      area: ad && ad.area / 10_000,
      cultivated_crop: ad?.cultivated_crop,
      description: ad?.description,
      irrigation: ad?.irrigation ? 'true' : 'false',
      is_rent: ad?.is_rent ? 'true' : 'false',
      land_category: ad?.land_category,
      land_use: ad?.land_use,
      price: ad?.price,
      survey: ad?.survey ? 'true' : 'false',
      title: ad?.title,
      type_of_use: ad?.type_of_use,
    },
    mode: 'all',
  });

  const watchRent = watch('is_rent');
  const watchTypeOfUse = watch('type_of_use');

  const maxCountAdImages = 10;
  let initPreviewImgArr: string[] = [];

  const isBankZemelDomain = myDomain === ad?.domain;

  if (ad) {
    if (isBankZemelDomain) {
      ad.photos.forEach((img) => {
        initPreviewImgArr = [...initPreviewImgArr, `${process.env.REACT_APP_API_URL}images/${img}`];
      });
    } else {
      initPreviewImgArr = ad.photos;
    }
  }

  const [files, setFiles] = useState<File[]>([]);
  const [isPlusFile, setIsPlusFile] = useState<boolean>(true);
  const [isErrorFiles, setIsErrorFiles] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>(initPreviewImgArr);
  const [addAdError, setAddAdError] = useState<string>('');
  const [removableFileArr, setRemovableFileArr] = useState<string[]>([]);
  const [initPreviewImgArrLength, setInitPreviewImgArrLength] = useState<number>(
    initPreviewImgArr.length,
  );
  const [isRemoveInitImages, setIsRemoveInitImages] = useState<boolean>(false);
  const [isPrepareSubmit, setIsPrepareSubmit] = useState<boolean>(false);

  const [isArableUse, setIsArableUse] = useState<boolean>(!!ad?.cultivated_crop);

  const arableUseChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setIsArableUse(JSON.parse(e.target.value));

  const hiddenFileInputRef = useRef<HTMLInputElement>(null);

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
        setIsPrepareSubmit(true);

        if (files.length < maxCountAdImages) {
          setFiles((prev) => prev.concat(filesArr));

          const filesObjectURLArr = filesArr.map((file) => URL.createObjectURL(file));

          const previewImagesCount = previewImages.length + filesArr.length;

          if (previewImagesCount > maxCountAdImages) {
            if (isBankZemelDomain) {
              initPreviewImgArr.forEach((img) => {
                const filtredImg = img.split(process.env.REACT_APP_API_URL as string)[1];
                setRemovableFileArr((prev) => [...prev, filtredImg]);
              });
            } else {
              setRemovableFileArr(initPreviewImgArr); // Возможно убрать ветвление, если объявления, которые парсятся нельзя редактирвоать, что логично
            }

            setPreviewImages(filesObjectURLArr);
            setFiles(filesArr);
            setIsRemoveInitImages(true);
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
    setIsPrepareSubmit(true);
    const target = e.target.children[0].src;

    const isInclude = includeInPreviewImgs(initPreviewImgArr, target);

    let filterPreviewImages: string[];

    const isTargetInPreviews = initPreviewImgArr.includes(target);

    if (isTargetInPreviews) {
      const filterTarget = target.split(process.env.REACT_APP_API_URL);

      setRemovableFileArr((prev) => [...prev, isBankZemelDomain ? filterTarget[1] : target]); // Возможно убрать ветвление, если объявления, которые парсятся нельзя редактирвоать, что логично
    }

    if (isInclude) {
      filterPreviewImages = previewImages.filter((img) => !target.includes(img));

      setInitPreviewImgArrLength((prev) => prev - 1);
    } else {
      filterPreviewImages = previewImages.filter((img) => img !== target);

      const filterFiles = files.filter(
        (_file, index) => previewImages.indexOf(target) !== index + initPreviewImgArrLength,
      );

      setFiles(filterFiles);
    }

    setPreviewImages(filterPreviewImages);

    if (filterPreviewImages.length < maxCountAdImages) {
      setIsPlusFile(true);
    } else {
      setIsPlusFile(false);
    }
  };

  const includeInPreviewImgs = (previewArr: string[], target: string) =>
    previewArr.some((img) => target.includes(img));

  const onChangeInputHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    defaultValue: string | number | boolean | undefined,
  ) => {
    const { target } = e;
    // target.defaultValue не возвращает дефолтный велью
    if (defaultValue !== undefined) {
      if (target.value.toString() !== defaultValue.toString()) {
        setIsPrepareSubmit(true);
      }
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
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

    removableFileArr.forEach((file) => formData.append('removableFiles', file));

    try {
      await editAd({ data: formData, id: ad?.id, isRemoveInitImages, token: cookies.token })
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

  return (
    <Styled.EditForm onSubmit={handleSubmit(onSubmit)}>
      <S.InputWrapper>
        <label>Название</label>
        <S.Input
          type='text'
          {...register('title', {
            onChange: (e) => onChangeInputHandler(e, ad?.title),

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
            onChange: (e) => onChangeInputHandler(e, ad?.area),
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
            onChange: (e) => onChangeInputHandler(e, ad?.price),
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
            onChange: (e) => onChangeInputHandler(e, ad?.description),
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
            onChange: (e) => onChangeInputHandler(e, ad?.address),
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
                onChange: (e) => onChangeInputHandler(e, ad?.land_category),
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
                onChange: (e) => onChangeInputHandler(e, ad?.land_use),
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
                onChange: (e) => onChangeInputHandler(e, ad?.type_of_use),
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
                checked={!!ad?.cultivated_crop}
              />
              <span>Используется</span>
            </S.FieldsetInputWrapper>
            {isArableUse && (
              <S.InputWrapper>
                <label>Выращиваемая культура</label>
                <S.Input
                  type='text'
                  placeholder='пшеница'
                  {...register('cultivated_crop', {
                    onChange: (e) => onChangeInputHandler(e, ad?.cultivated_crop),
                  })}
                />
              </S.InputWrapper>
            )}
            <S.FieldsetInputWrapper>
              <input
                type='radio'
                name='arableUse'
                value={'false'}
                onChange={arableUseChangeHandler}
                checked={!ad?.cultivated_crop}
              />
              <span>Не используется</span>
            </S.FieldsetInputWrapper>
          </S.Fieldset>
        )}
        {errors.type_of_use && <S.ErrorFormMsg>{errors.type_of_use.message}</S.ErrorFormMsg>}
      </S.Fieldset>

      <S.Fieldset>
        <legend>Права собственности</legend>
        {rents.map((rent) => (
          <S.FieldsetInputWrapper key={rent.value}>
            <input
              type='radio'
              value={rent.value}
              {...register('is_rent', {
                onChange: (e) => onChangeInputHandler(e, ad?.is_rent),
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
                onChange: (e) => onChangeInputHandler(e, ad?.rent_period),
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
                onChange: (e) => onChangeInputHandler(e, ad?.irrigation),
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
                onChange: (e) => onChangeInputHandler(e, ad?.survey),
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
              <Styled.EditPreviewAdvImageWrapper key={url} onClick={previewImageHandleDelete}>
                <S.PreviewAdvImage src={url} alt='Фото объявления' />
              </Styled.EditPreviewAdvImageWrapper>
            ))}

          {isPlusFile && (
            <div onClick={fileInputHandleClick}>
              <Styled.EditPlusIcon src={plug} alt='Добавить изображение' />
            </div>
          )}
        </S.AdvImagesWrapper>
        {isErrorFiles && (
          <S.ErrorFormMsg>Загрузите до {maxCountAdImages} фотографий</S.ErrorFormMsg>
        )}
      </S.InputWrapper>

      <CustomButton type='submit' variant='outlined' disabled={isUpdating || !isPrepareSubmit}>
        {isUpdating ? loadingTextBtn : 'Редактировать объявление'}
      </CustomButton>

      {isError && <S.ErrorFormMsg>{addAdError}</S.ErrorFormMsg>}
    </Styled.EditForm>
  );
};

export default EditAdForm;
