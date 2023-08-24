import React from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectFilterAds, setFiltersAds } from '../../redux/slices/filtersAdsSlice';
import { sorting } from './options';
import * as S from './styles';

const Sorting = () => {
  const filtersAds = useAppSelector(selectFilterAds);
  const dispatch = useAppDispatch();

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      setFiltersAds({
        ...filtersAds,
        ...{
          sorting: {
            [e.target.options[e.target.selectedIndex].value]:
              e.target.options[e.target.selectedIndex].dataset.order,
          },
        },
      }),
    );
  };

  return (
    <S.SortingWrapper>
      <span>Cортировка:</span>
      <S.SelectSorting onChange={(e) => onChangeSelect(e)}>
        {sorting.map((sort) => (
          <option key={sort.title} value={sort.value} data-order={sort.order}>
            {sort.title}
          </option>
        ))}
      </S.SelectSorting>
    </S.SortingWrapper>
  );
};

export default Sorting;
