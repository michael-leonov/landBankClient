/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import plug from '../../assets/add_ad_photo_plug.jpg';
import { useComponentDidMount } from '../../hooks/useComponentDidMount';
import { useDebounce } from '../../hooks/useDebounce';
import { useAppSelector } from '../../redux/hooks';
import { useAddAdMutation, useEditAdMutation } from '../../redux/services/ads/adsApi';
import { isFetchBaseQueryError, isErrorWithMessage } from '../../redux/services/helpers';
import { selectUser } from '../../redux/slices/userSlice';
import {
  irrigations,
  landCategories,
  landUse,
  myDomain,
  rents,
  rosreestrBaseUrl,
  survey,
  typeOfUse,
} from '../../utils/consts';
import { LandCategoryEnum } from '../../utils/enums';
import { dadataAddressHints } from '../../utils/funcs/dadataAddressHints';
import loadingTextBtn from '../../utils/funcs/loadingTextBtn';
import CustomButton from '../custom-button';
import SubmitingForm from '../submiting-form';
import { AdMutationFormProps, ICadastralObjectTitle } from './interface';
import * as S from './styles';
import FormValues from './types';

import 'react-dadata/dist/react-dadata.css';

const AdMutationForm = ({ ad, isEditStatusForm }: AdMutationFormProps) => {
  const { userInfo } = useAppSelector(selectUser);
  const [addAd, { isError: isErrorAdding, isLoading: isAdding }] = useAddAdMutation();
  const [editAd, { isError: isErrorUpdating, isLoading: isUpdating }] = useEditAdMutation();

  const {
    formState,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
  } = useForm<FormValues>({
    ...(isEditStatusForm && {
      defaultValues: {
        address: ad?.address,
        area: ad && ad.area / 10_000,
        cadastral_number: ad?.cadastral_number !== 'NULL' || !null ? ad?.cadastral_number : '',
        cultivated_crop: ad?.cultivated_crop,
        description: ad?.description,
        irrigation: ad?.irrigation ? 'true' : 'false',
        is_rent: ad?.is_rent ? 'true' : 'false',
        land_category: ad?.land_category,
        land_use: ad?.land_use,
        price: ad?.price,
        survey: ad?.survey ? 'true' : 'false',
        title: ad?.title,
        type_of_use: ad?.type_of_use || undefined,
      },
    }),
    mode: 'all',
  });

  const watchRent = watch('is_rent');
  const watchTypeOfUse = watch('type_of_use');
  const watchCadastral = watch('cadastral_number');
  const watchAddress = watch('address');

  const maxCountAdImages = 10;
  let initPreviewImgArr: string[] = [];

  const isBankZemelDomain = myDomain === ad?.domain;

  if (isEditStatusForm) {
    if (ad) {
      if (isBankZemelDomain) {
        ad.photos.forEach((img) => {
          initPreviewImgArr = [
            ...initPreviewImgArr,
            `${process.env.REACT_APP_API_URL}images/${img}`,
          ];
        });
      } else {
        initPreviewImgArr = ad.photos;
      }
    }
  }

  const hiddenFileInputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [isPlusFile, setIsPlusFile] = useState<boolean>(true);
  const [isErrorFiles, setIsErrorFiles] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>(
    isEditStatusForm ? initPreviewImgArr : [],
  );
  const [addAdError, setAddAdError] = useState<string>('');
  const [removableFileArr, setRemovableFileArr] = useState<string[]>([]);
  const [initPreviewImgArrLength, setInitPreviewImgArrLength] = useState<number>(
    initPreviewImgArr.length,
  );
  const [isRemoveInitImages, setIsRemoveInitImages] = useState<boolean>(false);
  const [isPrepareSubmit, setIsPrepareSubmit] = useState<boolean>(false);

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

        if (isEditStatusForm) {
          setIsPrepareSubmit(true);
        }

        if (files.length < maxCountAdImages) {
          setFiles((prev) => prev.concat(filesArr));

          const filesObjectURLArr = filesArr.map((file) => URL.createObjectURL(file));

          const previewImagesCount = previewImages.length + filesArr.length;

          if (previewImagesCount > maxCountAdImages) {
            if (isEditStatusForm) {
              if (isBankZemelDomain) {
                initPreviewImgArr.forEach((img) => {
                  const filtredImg = img.split(process.env.REACT_APP_API_URL as string)[1];
                  setRemovableFileArr((prev) => [...prev, filtredImg]);
                });
              } else {
                setRemovableFileArr(initPreviewImgArr); // Возможно убрать ветвление, если объявления, которые парсятся нельзя редактирвоать, что логично
              }
            }

            setPreviewImages(filesObjectURLArr);
            setFiles(filesArr);
            if (isEditStatusForm) {
              setIsRemoveInitImages(true);
            }
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

  let previewImageHandleDelete: React.MouseEventHandler<HTMLDivElement> | undefined;

  if (isEditStatusForm) {
    previewImageHandleDelete = (e: any) => {
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
  } else {
    previewImageHandleDelete = (e: any) => {
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
  }

  const includeInPreviewImgs = (previewArr: string[], target: string) =>
    previewArr.some((img) => target.includes(img));

  const onChangeInputHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    defaultValue: string | number | boolean | undefined,
  ) => {
    const { target } = e;
    if (defaultValue !== undefined) {
      if (target.value.toString() !== defaultValue.toString()) {
        setIsPrepareSubmit(true);
      }
    }
  };

  const [apiReestrResponse, setApiReestrResponse] = useState<ICadastralObjectTitle[] | null>(null);
  const [isShowApiReestrResponse, setIsShowApiReestrResponse] = useState<boolean>(false);
  const [addressesSuggetions, setAddressesSuggetions] = useState<any>();
  const [isShowAddressSuggetions, setIsShowAddressSuggetions] = useState<boolean>(false);
  const [addressError, setAddressError] = useState<string>('');

  const isComponentMounted = useComponentDidMount();

  const debounceCadastral = useDebounce(watchCadastral, 1000);

  const getCadastralObjects = async (cn: string) => {
    if (isComponentMounted) {
      if (debounceCadastral) {
        const res = await fetch(
          `${rosreestrBaseUrl}/typeahead/1?` +
            new URLSearchParams({
              text: cn,
            }),
        );

        const data: { results: ICadastralObjectTitle[] } = await res.json();

        if (data.results.length) {
          setApiReestrResponse(data.results);
          setIsShowApiReestrResponse(true);
        }
      }
    }
  };

  useEffect(() => {
    getCadastralObjects(watchCadastral);
  }, [debounceCadastral]);

  const onClickCadastralObjectHanlder = async (value: string) => {
    setIsShowApiReestrResponse(false);

    const res = await fetch(
      `${rosreestrBaseUrl}/features/1?` +
        new URLSearchParams({
          text: value,
        }),
    );

    const data = await res.json();

    const cadastralId: string = data.features[0].attrs.id;

    const getCadastralInfo = await fetch(`${rosreestrBaseUrl}/features/1/${cadastralId}`);

    const cadastralInfo = await getCadastralInfo.json();

    const addressInfo = await dadataAddressHints(cadastralInfo.feature.attrs.address);

    if (addressInfo.suggestions.length) {
      setIsShowAddressSuggetions(true);
      setAddressesSuggetions(addressInfo.suggestions);
    }

    setValue('area', cadastralInfo.feature.attrs.area_value / 10_000);
    setValue('cadastral_number', cadastralInfo.feature.attrs.cn);

    switch (cadastralInfo.feature.attrs.category_type) {
      case LandCategoryEnum.AGRICULTURAL:
        setValue('land_category', 'agricultural');
        break;

      case LandCategoryEnum.URBAN:
        setValue('land_category', 'urban');
        break;

      case LandCategoryEnum.INDUSTRIAL:
        setValue('land_category', 'industrial');
        break;
    }
  };

  const [addressData, setAddressData] = useState<any>(null);

  const onClickAddressInput = (suggetion: any) => {
    setIsShowAddressSuggetions(false);
    setValue('address', suggetion.value);
    setAddressData(suggetion.data);
  };

  const debounceAddress = useDebounce(watchAddress, 1000);

  const onChangeAddressInput = async () => {
    if (debounceAddress) {
      const addressInfo = await dadataAddressHints(watchAddress);

      if (addressInfo.suggestions.length) {
        setIsShowAddressSuggetions(true);
        setAddressesSuggetions(addressInfo.suggestions);
      }
    }
  };

  useEffect(() => {
    if (isComponentMounted) {
      onChangeAddressInput();
    }
  }, [debounceAddress]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = new FormData();

    if (addressData) {
      formData.append('region_kladr_id', addressData.region_kladr_id);

      if (addressData.geo_lat && addressData.geo_lon) {
        formData.append('geo_lat', addressData.geo_lat);
        formData.append('geo_lon', addressData.geo_lon);
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

    if (isEditStatusForm) {
      removableFileArr.forEach((file) => formData.append('removableFiles', file));
    }

    try {
      isEditStatusForm
        ? await editAd({ data: formData, id: ad?.id, isRemoveInitImages })
            .unwrap()
            .catch((error) => {
              setAddAdError(error.data.message);
            })
        : await addAd(formData)
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
    if (!isEditStatusForm) {
      if (formState.isSubmitSuccessful) {
        reset();
      }
    }
  }, [formState, reset]);

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)} isEditStatusForm={isEditStatusForm}>
      <S.InputWrapper>
        <label>Название*</label>
        <S.Input
          type='text'
          placeholder='Участок 2 гектара'
          {...register('title', {
            required: 'Введите название',
            ...(isEditStatusForm && { onChange: (e) => onChangeInputHandler(e, ad?.title) }),
          })}
        />
        {errors.title && <S.ErrorFormMsg>{errors.title.message}</S.ErrorFormMsg>}
      </S.InputWrapper>

      <S.CadastralInputBlock>
        <S.InputWrapper>
          <label>Кадастровый номер</label>
          <S.Input
            type='text'
            {...register('cadastral_number', {
              onChange: (e) => {
                setIsShowAddressSuggetions(false);

                if (isEditStatusForm) {
                  onChangeInputHandler(e, ad?.cadastral_number);
                }
              },
            })}
          />
        </S.InputWrapper>
        {isShowApiReestrResponse && apiReestrResponse && (
          <S.CadastralResultsListWrapper>
            <ul>
              {apiReestrResponse.map((objectTitle: ICadastralObjectTitle) => (
                <S.CadastralObject
                  key={objectTitle.value}
                  onClick={() => onClickCadastralObjectHanlder(objectTitle.value)}
                >
                  {objectTitle.title}
                </S.CadastralObject>
              ))}
            </ul>
          </S.CadastralResultsListWrapper>
        )}
      </S.CadastralInputBlock>

      <S.AddressInputBlock>
        <S.InputWrapper>
          <label>
            Адрес* <span>(выберите из списка после ввода)</span>
          </label>
          <S.Input
            type='text'
            placeholder='Ставропольский край, Ставрополь, Нижняя улица, 47'
            {...register('address', {
              required: 'Введите адрес',
              ...(isEditStatusForm && { onChange: (e) => onChangeInputHandler(e, ad?.address) }),
            })}
          />
          {errors.address && <S.ErrorFormMsg>{errors.address.message}</S.ErrorFormMsg>}
          {addressError && <S.ErrorFormMsg>{addressError}</S.ErrorFormMsg>}
        </S.InputWrapper>
        {isShowAddressSuggetions && (
          <S.AddressSuggetionsList>
            <ul>
              {addressesSuggetions.map((suggetion: any) => (
                <S.AddresSuggetion
                  key={suggetion.value}
                  onClick={() => onClickAddressInput(suggetion)}
                >
                  {suggetion.value}
                </S.AddresSuggetion>
              ))}
            </ul>
          </S.AddressSuggetionsList>
        )}
      </S.AddressInputBlock>

      <S.InputWrapper>
        <label>Площадь, Га*</label>
        <S.Input
          placeholder='2'
          {...register('area', {
            min: {
              message: 'Не может быть меньше 0',
              value: 0,
            },
            required: 'Введите площадь',
            setValueAs: (v) => parseInt(v),
            valueAsNumber: true,
            ...(isEditStatusForm && { onChange: (e) => onChangeInputHandler(e, ad?.area) }),
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
            ...(isEditStatusForm && { onChange: (e) => onChangeInputHandler(e, ad?.price) }),
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
            ...(isEditStatusForm && { onChange: (e) => onChangeInputHandler(e, ad?.description) }),
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
                ...(isEditStatusForm && {
                  onChange: (e) => onChangeInputHandler(e, ad?.land_category),
                }),
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
                ...(isEditStatusForm && {
                  onChange: (e) => onChangeInputHandler(e, ad?.land_use),
                }),
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
                ...(isEditStatusForm && {
                  onChange: (e) => onChangeInputHandler(e, ad?.type_of_use),
                }),
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
                <S.Input
                  type='text'
                  placeholder='пшеница'
                  {...register('cultivated_crop', {
                    ...(isEditStatusForm && {
                      onChange: (e) => onChangeInputHandler(e, ad?.cultivated_crop),
                    }),
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
                checked={isEditStatusForm && !ad?.cultivated_crop}
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
                ...(isEditStatusForm && {
                  onChange: (e) => onChangeInputHandler(e, ad?.is_rent),
                }),
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
                ...(isEditStatusForm && {
                  onChange: (e) => onChangeInputHandler(e, ad?.rent_period),
                }),
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
                ...(isEditStatusForm && {
                  onChange: (e) => onChangeInputHandler(e, ad?.irrigation),
                }),
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
                ...(isEditStatusForm && {
                  onChange: (e) => onChangeInputHandler(e, ad?.survey),
                }),
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
              <S.PreviewAdvImageWrapper
                key={url}
                onClick={previewImageHandleDelete}
                isEditStatusForm={isEditStatusForm}
              >
                <S.PreviewAdvImage src={url} alt='Фото объявления' />
              </S.PreviewAdvImageWrapper>
            ))}

          {isPlusFile && (
            <div onClick={fileInputHandleClick}>
              <S.PlusIcon
                src={plug}
                alt='Добавить изображение'
                isEditStatusForm={isEditStatusForm}
              />
            </div>
          )}
        </S.AdvImagesWrapper>
        {isErrorFiles && (
          <S.ErrorFormMsg>Загрузите до {maxCountAdImages} фотографий</S.ErrorFormMsg>
        )}
      </S.InputWrapper>

      <S.MutationBtnWrapper>
        <CustomButton
          type='submit'
          variant='outlined'
          disabled={isAdding || isUpdating || (isEditStatusForm && !isPrepareSubmit)}
        >
          {isAdding || isUpdating
            ? loadingTextBtn
            : isEditStatusForm
            ? 'Редактировать объявление'
            : 'Добавить объявление'}
        </CustomButton>
      </S.MutationBtnWrapper>

      {(isErrorAdding || isErrorUpdating) && <S.ErrorFormMsg>{addAdError}</S.ErrorFormMsg>}
      <SubmitingForm loading={isAdding || isUpdating} />
    </S.Form>
  );
};

export default AdMutationForm;
