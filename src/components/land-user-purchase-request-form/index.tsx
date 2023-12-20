import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';

import { useAppSelector } from '../../redux/hooks';
import { isFetchBaseQueryError, isErrorWithMessage } from '../../redux/services/helpers';
import {
  useAddRequestAdMutation,
  useEditRequestAdMutation,
} from '../../redux/services/request-ads/requestAdsApi';
import { selectUser } from '../../redux/slices/userSlice';
import {
  irrigations,
  landCategories,
  landUse,
  noMatterCategory,
  survey,
  typeOfUse,
} from '../../utils/consts';
import postiveValidationHandler from '../../utils/funcs/positiveValidtaionHandler';
import CustomButton from '../custom-button';
import ErrorHandling from '../error-handling';
import SubmitingForm from '../submiting-form';
import LandUserMutationRequestAdFormProps from './interface';
import * as S from './styles';
import FormValues from './types';

const LandUserMutationRequestAdForm = ({
  ad,
  isEditStatusForm,
}: LandUserMutationRequestAdFormProps) => {
  const [isCheckedNoMatterFieldLandUse, setIsCheckedNoMatterFieldLandUse] =
    useState<boolean>(false);
  const [isCheckedNoMatterFieldTypeOfUse, setIsCheckedNoMatterFieldTypeOfUse] =
    useState<boolean>(false);

  // const [isCheckedCheckboxesLandUse, setIsCheckedCheckboxesLandUse] = useState<boolean>(false);
  // const [isCheckedCheckboxesTypeOfUse, setIsCheckedCheckboxesTypeOfUse] = useState<boolean>(false);

  const {
    formState,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    // watch,
  } = useForm<FormValues>({
    ...(isEditStatusForm &&
      ad && {
        defaultValues: {
          areaFrom: ad.areaFrom,
          areaTo: ad.areaTo,
          irrigation: ad.irrigation ? 'true' : 'false',
          landCategory: ad.landCategory,
          landUse: ad.landUse,
          priceFrom: ad.priceFrom,
          priceTo: ad.priceTo,
          survey: ad.survey ? 'true' : 'false',
          typeOfUse: ad.typeOfUse,
        },
      }),
    mode: 'all',
  });

  // const watchTypeOfUse = watch('typeOfUse');
  // const watchRent = watch('is_rent');

  // const [isArableUse, setIsArableUse] = useState<boolean>(false);

  // const arableUseChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
  //   setIsArableUse(JSON.parse(e.target.value));

  const [addRequestAd, { isError: isErrorAdding, isLoading: isAdding }] = useAddRequestAdMutation();
  const [editRequestAd, { isError: isErrorUpdating, isLoading: isUpdating }] =
    useEditRequestAdMutation();

  const [mutationError, setMutationError] = useState<FetchBaseQueryError | { message: string }>();

  const { userInfo } = useAppSelector(selectUser);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (data.landUse.includes(noMatterCategory.value)) {
      data.landUse = [noMatterCategory.value];
    }

    if (data.typeOfUse.includes(noMatterCategory.value)) {
      data.typeOfUse = [noMatterCategory.value];
    }

    try {
      isEditStatusForm && ad
        ? await editRequestAd({
            data,
            id: ad.id,
          }).unwrap()
        : await addRequestAd({ ...data, ...(userInfo && { userId: userInfo.id }) }).unwrap();
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        setMutationError(err);
      } else if (isErrorWithMessage(err)) {
        setMutationError(err);
      }
    }

    // eslint-disable-next-line no-console
    console.log(data);
  };

  useEffect(() => {
    if (!isEditStatusForm) {
      if (formState.isSubmitSuccessful) {
        reset();
        setIsCheckedNoMatterFieldLandUse(false);
        setIsCheckedNoMatterFieldTypeOfUse(false);
      }
    }
  }, [formState, reset]);

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)} isEditStatusForm={isEditStatusForm}>
      <div>
        <label>Площадь, Га</label>
        <S.AreaInputsWrapper>
          <S.AreaInput
            placeholder='от'
            type='number'
            {...register('areaFrom', {
              validate: {
                atLeastOne: (value, formValues) => {
                  if (formValues.areaTo || value > 0) {
                    return true;
                  }

                  return 'Введите хотя бы одно значение!';
                },
                moreThenMax: (value, formValues) => {
                  if (formValues.areaTo && value) {
                    return (
                      Number(formValues.areaTo) >= Number(value) ||
                      'Максимальная площадь не можеть быть ниже минимальной!'
                    );
                  }
                },
                positive: (value) =>
                  postiveValidationHandler('Минимальная площадь должна быть больше нуля!', value),
              },
              valueAsNumber: true,
            })}
          />
          <div />
          <S.AreaInput
            placeholder='до'
            type='number'
            {...register('areaTo', {
              validate: {
                lessThenMin: (value, formValues) => {
                  if (formValues.areaFrom && value) {
                    return (
                      Number(formValues.areaFrom) <= Number(value) ||
                      'Максимальная площадь не можеть быть ниже минимальной!'
                    );
                  }
                },
                positive: (value) =>
                  postiveValidationHandler('Максимальная площадь должна быть больше нуля!', value),
              },
              valueAsNumber: true,
            })}
          />
        </S.AreaInputsWrapper>
        {errors.areaFrom && <S.ErrorFormMsg>{errors.areaFrom.message}</S.ErrorFormMsg>}
        {errors.areaTo && <S.ErrorFormMsg>{errors.areaTo.message}</S.ErrorFormMsg>}
      </div>

      <div>
        <label>Цена, ₽</label>{' '}
        <S.PriceInputsWrapper>
          <S.PriceInput
            placeholder='от'
            type='number'
            {...register('priceFrom', {
              required: false,
              validate: {
                atLeastOne: (value, formValues) => {
                  if (formValues.priceTo || value > 0) {
                    return true;
                  }

                  return 'Введите хотя бы одно значение!';
                },
                moreThenMax: (value, formValues) => {
                  if (formValues.priceTo && value) {
                    return (
                      Number(formValues.priceTo) >= Number(value) ||
                      'Максимальная цена не можеть быть ниже минимальной!'
                    );
                  }
                },
                positive: (value) =>
                  postiveValidationHandler('Минимальная должна быть больше нуля!', value),
              },
              valueAsNumber: true,
            })}
          />
          <div />
          <S.PriceInput
            placeholder='до'
            type='number'
            {...register('priceTo', {
              required: false,
              validate: {
                lessThenMin: (value, formValues) => {
                  if (formValues.priceFrom && value) {
                    return (
                      Number(formValues.priceFrom) <= Number(value) ||
                      'Максимальная цена не можеть быть ниже минимальной!'
                    );
                  }
                },

                positive: (value) =>
                  postiveValidationHandler('Максимальная цена должна быть больше нуля!', value),
              },
              valueAsNumber: true,
            })}
          />
        </S.PriceInputsWrapper>
        {errors.priceFrom && <S.ErrorFormMsg>{errors.priceFrom.message}</S.ErrorFormMsg>}
        {errors.priceTo && <S.ErrorFormMsg>{errors.priceTo.message}</S.ErrorFormMsg>}
      </div>

      <S.Fieldset>
        <legend>Категория земель</legend>
        {landCategories.map((category) => (
          <S.FieldsetInputWrapper key={category.value}>
            <input
              type='radio'
              value={category.value}
              {...register('landCategory', {
                required: 'Выберите хотя бы один пункт',
              })}
            />
            <span>{category.title}</span>
          </S.FieldsetInputWrapper>
        ))}
        {errors.landCategory && <S.ErrorFormMsg>{errors.landCategory.message}</S.ErrorFormMsg>}
      </S.Fieldset>

      <S.Fieldset>
        <legend>Землепользование</legend>
        {landUse.map((category) => (
          <S.FieldsetInputWrapper key={category.value}>
            <input
              type='checkbox'
              value={category.value}
              disabled={isCheckedNoMatterFieldLandUse}
              // checked={isCheckedCheckboxesLandUse}
              {...register('landUse', {
                required: 'Выберите хотя бы один пункт',
              })}
            />
            <span> {category.title}</span>
          </S.FieldsetInputWrapper>
        ))}
        <S.FieldsetInputWrapper>
          <input
            type='checkbox'
            value={noMatterCategory.value}
            {...register('landUse', {
              required: 'Выберите хотя бы один пункт',
            })}
            onChange={(e) => {
              const target = e.target;

              if (!target.checked) {
                setIsCheckedNoMatterFieldLandUse(false);
              } else {
                setIsCheckedNoMatterFieldLandUse(true);
                // setIsCheckedCheckboxesLandUse(false);
              }
            }}
          />
          <span> {noMatterCategory.title}</span>
        </S.FieldsetInputWrapper>
        {errors.landUse && <S.ErrorFormMsg>{errors.landUse.message}</S.ErrorFormMsg>}
      </S.Fieldset>

      <S.Fieldset>
        <legend>Вид использования</legend>
        {typeOfUse.map((type) => (
          <S.FieldsetInputWrapper key={type.value}>
            <input
              type='checkbox'
              disabled={isCheckedNoMatterFieldTypeOfUse}
              value={type.value}
              {...register('typeOfUse', {
                required: 'Выберите хотя бы один пункт',
              })}
            />
            <span>{type.title}</span>
          </S.FieldsetInputWrapper>
        ))}
        <S.FieldsetInputWrapper>
          <input
            type='checkbox'
            value={noMatterCategory.value}
            {...register('typeOfUse')}
            onChange={(e) => {
              const target = e.target;

              if (!target.checked) {
                setIsCheckedNoMatterFieldTypeOfUse(false);
              } else {
                setIsCheckedNoMatterFieldTypeOfUse(true);
                // setIsCheckedCheckboxesTypeOfUse(false);
              }
            }}
          />
          <span> {noMatterCategory.title}</span>
        </S.FieldsetInputWrapper>
        {/* {watchTypeOfUse === 'arable' && (
          <S.Fieldset>
            <legend>Используется ли?</legend>
            <S.FieldsetInputWrapper>
              <input
                type='radio'
                name='arableUse'
                value={'true'}
                // onChange={arableUseChangeHandler}
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
                // onChange={arableUseChangeHandler}
              />
              <span>Не используется</span>
            </S.FieldsetInputWrapper>
          </S.Fieldset>
        )} */}
        {errors.typeOfUse && <S.ErrorFormMsg>{errors.typeOfUse.message}</S.ErrorFormMsg>}
      </S.Fieldset>

      {/* <S.Fieldset>
        <legend>Права собственности</legend>
        {rents.map((rent) => (
          <S.FieldsetInputWrapper key={rent.value}>
            <input type='radio' value={rent.value} {...register('is_rent')} />
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
              {...register('rent_period')}
            />
          </S.InputWrapper>
        )}
        {errors.rent_period && <S.ErrorFormMsg>{errors.rent_period.message}</S.ErrorFormMsg>}
      </S.Fieldset> */}

      <S.Fieldset>
        <legend>Орошение</legend>
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

        <S.FieldsetInputWrapper>
          <input type='radio' value='' {...register('irrigation')} />
          <span>{noMatterCategory.title}</span>
        </S.FieldsetInputWrapper>
        {errors.irrigation && <S.ErrorFormMsg>{errors.irrigation.message}</S.ErrorFormMsg>}
      </S.Fieldset>

      <S.Fieldset>
        <legend>Межевание</legend>
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
        <S.FieldsetInputWrapper>
          <input type='radio' value='' {...register('survey')} />
          <span>{noMatterCategory.title}</span>
        </S.FieldsetInputWrapper>
        {errors.survey && <S.ErrorFormMsg>{errors.survey.message}</S.ErrorFormMsg>}
      </S.Fieldset>

      {(isErrorAdding || isErrorUpdating) && <ErrorHandling error={mutationError} />}

      <div style={{ margin: '0 auto' }}>
        <CustomButton type='submit' variant='outlined' disabled={isAdding || isUpdating}>
          Создать запрос
        </CustomButton>
      </div>

      <SubmitingForm loading={isAdding || isUpdating} />
    </S.Form>
  );
};

export default LandUserMutationRequestAdForm;
