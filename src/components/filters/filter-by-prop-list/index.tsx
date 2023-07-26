import React from 'react';

import FilterByProp from '../filter-by-prop';
import FiltersByPropListProps from './interface';
import * as S from './styles';

const FiltersByPropList = ({ register }: FiltersByPropListProps) => {
  return (
    <S.FormSearchItemsWrapper>
      <FilterByProp filterName='Источник'>
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
      <FilterByProp filterName='Цена, ₽'>
        <S.PaddingWrapper>
          <S.PriceInputsWrapper>
            <S.PriceInput
              placeholder='от'
              type='number'
              {...register('priceFrom', {
                min: 0,
                required: false,
              })}
            />
            <div />
            <S.PriceInput
              placeholder='до'
              type='number'
              {...register('priceTo', {
                required: false,
              })}
            />
          </S.PriceInputsWrapper>
        </S.PaddingWrapper>
      </FilterByProp>
      <FilterByProp filterName='Площадь, гектары'>
        <S.PaddingWrapper>
          <S.AreaInputsWrapper>
            <S.AreaInput
              placeholder='от'
              type='number'
              {...register('areaFrom', {
                min: 0,
                required: false,
              })}
            />
            <div />
            <S.AreaInput
              placeholder='до'
              type='number'
              {...register('areaTo', {
                required: false,
              })}
            />
          </S.AreaInputsWrapper>
        </S.PaddingWrapper>
      </FilterByProp>
    </S.FormSearchItemsWrapper>
  );
};

export default FiltersByPropList;
