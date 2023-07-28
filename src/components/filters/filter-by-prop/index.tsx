/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';

import FilterByPropProps from './interface';
import * as S from './styles';

const FilterByProp = ({ children, errors, filterName }: FilterByPropProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <S.FilterBlock>
      <S.FilterBtn onClick={() => setIsOpen(!isOpen)} open={isOpen} type='button'>
        <span>{filterName}</span>
      </S.FilterBtn>

      {isOpen && <div>{children}</div>}
    </S.FilterBlock>
  );
};

export default FilterByProp;
