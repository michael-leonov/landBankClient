import React from 'react';

import FilterByProp from '../filter-by-prop';
import FiltersByPropListProps from './interface';
import * as S from './styles';

const FiltersByPropList = ({ errors, getValues, register }: FiltersByPropListProps) => {
  const postiveValidationHandler = (errorMsg: string, value?: number) => {
    if (value) {
      return value > 0 || errorMsg;
    }
  };

  return (
    <S.FormSearchItemsWrapper>
      <FilterByProp filterName='Источник' errors={errors}>
        <S.PaddingWrapper>
          <S.SourceInputsBlock>
            <S.SourceInputWrapper>
              <input
                type='checkbox'
                value='cian.ru'
                {...register('domain', {
                  required: false,
                })}
              />
              <label>Циан</label>
            </S.SourceInputWrapper>
            <S.SourceInputWrapper>
              <input
                type='checkbox'
                value='avito.ru'
                {...register('domain', {
                  required: false,
                })}
              />
              <label>Авито</label>
            </S.SourceInputWrapper>
          </S.SourceInputsBlock>
        </S.PaddingWrapper>
      </FilterByProp>
      <FilterByProp filterName='Цена, ₽' errors={errors}>
        <S.PaddingWrapper>
          <S.PriceInputsWrapper>
            <S.PriceInput
              placeholder='от'
              type='number'
              {...register('priceFrom', {
                required: false,
                validate: {
                  moreThenMax: (value) => {
                    const { priceTo } = getValues();
                    if (priceTo && value) {
                      return (
                        priceTo >= value || 'Максимальная цена не можеть быть ниже минимальной!'
                      );
                    }
                  },
                  positive: (value) =>
                    postiveValidationHandler('Минимальная должна быть больше нуля!', value),
                },
              })}
            />
            <div />
            <S.PriceInput
              placeholder='до'
              type='number'
              {...register('priceTo', {
                required: false,
                validate: {
                  lessThenMin: (value) => {
                    const { priceFrom } = getValues();

                    if (priceFrom && value) {
                      return (
                        priceFrom <= value || 'Максимальная цена не можеть быть ниже минимальной!'
                      );
                    }
                  },

                  positive: (value) =>
                    postiveValidationHandler('Максимальная цена должна быть больше нуля!', value),
                },
              })}
            />
          </S.PriceInputsWrapper>
          {errors.priceFrom && <p>{errors.priceFrom.message}</p>}
          {errors.priceTo && <p>{errors.priceTo.message}</p>}
        </S.PaddingWrapper>
      </FilterByProp>
      <FilterByProp filterName='Площадь, гектары' errors={errors}>
        <S.PaddingWrapper>
          <S.AreaInputsWrapper>
            <S.AreaInput
              placeholder='от'
              type='number'
              {...register('areaFrom', {
                required: false,
                validate: {
                  moreThenMax: (value) => {
                    const { areaTo } = getValues();
                    if (areaTo && value) {
                      return (
                        areaTo >= value || 'Максимальная площадь не можеть быть ниже минимальной!'
                      );
                    }
                  },
                  positive: (value) =>
                    postiveValidationHandler('Минимальная площадь должна быть больше нуля!', value),
                },
              })}
            />
            <div />
            <S.AreaInput
              placeholder='до'
              type='number'
              {...register('areaTo', {
                required: false,
                validate: {
                  lessThenMin: (value) => {
                    const { priceFrom } = getValues();
                    if (priceFrom && value) {
                      return (
                        priceFrom <= value ||
                        'Максимальная площадь не можеть быть ниже минимальной!'
                      );
                    }
                  },
                  positive: (value) =>
                    postiveValidationHandler(
                      'Максимальная площадь должна быть больше нуля!',
                      value,
                    ),
                },
              })}
            />
          </S.AreaInputsWrapper>
          {errors.areaFrom && <p>{errors.areaFrom.message}</p>}
          {errors.areaTo && <p>{errors.areaTo.message}</p>}
        </S.PaddingWrapper>
      </FilterByProp>
    </S.FormSearchItemsWrapper>
  );
};

export default FiltersByPropList;
