/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import React from 'react';

import * as S from './styles';

const UnitPriceFilter = ({ areaState, register }: any) => {
  return (
    <S.Select {...register('unitPrice')}>
      <option value='false'>По умолчанию</option>
      <option value='true'>За 1 {areaState}</option>
    </S.Select>
  );
};

export default UnitPriceFilter;
