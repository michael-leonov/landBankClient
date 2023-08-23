import React, { useState } from 'react';

import SearchBar from '../search-bar';
import AreaFilter from './area-filter';
import AreaUnitFilter from './area-unit-filter';
import DatePublishedFilter from './date-published-filter';
import FilterByProp from './filter-by-prop';
import FiltersByPropListProps from './interface';
import LandCategoryFilter from './land-category-filter';
import LandUseFilter from './land-use-filter';
import PriceFilter from './price-filter';
import RentFilter from './rent-filter';
import SourceFilter from './source-filter';
import * as S from './styles';

const FiltersByPropList = ({ errors, register, setValue }: FiltersByPropListProps) => {
  const [areaState, setAreaState] = useState<string>('Га');

  return (
    <S.FormSearchItemsWrapper>
      <FilterByProp filterName='Источник'>
        <S.PaddingWrapper>
          <SourceFilter register={register} />
        </S.PaddingWrapper>
      </FilterByProp>
      <FilterByProp filterName='Цена, ₽'>
        <S.PaddingWrapper>
          <PriceFilter register={register} />
          {errors.priceFrom && <p>{errors.priceFrom.message}</p>}
          {errors.priceTo && <p>{errors.priceTo.message}</p>}
        </S.PaddingWrapper>
      </FilterByProp>
      <FilterByProp filterName={`Площадь, ${areaState}`}>
        <S.PaddingWrapper>
          <AreaUnitFilter register={register} setValue={setValue} setAreaState={setAreaState} />
          <AreaFilter register={register} />
          {errors.areaFrom && <p>{errors.areaFrom.message}</p>}
          {errors.areaTo && <p>{errors.areaTo.message}</p>}
        </S.PaddingWrapper>
      </FilterByProp>
      <FilterByProp filterName='Категория земель'>
        <S.PaddingWrapper>
          <LandCategoryFilter register={register} />
        </S.PaddingWrapper>
      </FilterByProp>
      <FilterByProp filterName='Землепользование'>
        <S.PaddingWrapper>
          <LandUseFilter register={register} />
        </S.PaddingWrapper>
      </FilterByProp>
      <FilterByProp filterName='Права пользования'>
        <S.PaddingWrapper>
          <RentFilter register={register} />
        </S.PaddingWrapper>
      </FilterByProp>
      <FilterByProp filterName='Дата публикации'>
        <S.PaddingWrapper>
          <DatePublishedFilter register={register} />
        </S.PaddingWrapper>
      </FilterByProp>
      <FilterByProp filterName='Поиск по ключевым словам'>
        <S.PaddingWrapper>
          <SearchBar register={register} />
        </S.PaddingWrapper>
      </FilterByProp>
    </S.FormSearchItemsWrapper>
  );
};

export default FiltersByPropList;
