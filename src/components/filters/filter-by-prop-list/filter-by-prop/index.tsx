import React, { useState } from 'react';

import FilterByPropProps from './interface';
import * as S from './styles';

const FilterByProp = ({ children, filterName }: FilterByPropProps) => {
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
