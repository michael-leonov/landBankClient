/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';

import FilterByPropProps from './interface';
import * as S from './styles';

const FilterByProp = ({ children, errors, filterName }: FilterByPropProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // TODO: Открывать при ошибке формы с фильтром и закрывать при отправке формы
  // useEffect(() => {
  //   // eslint-disable-next-line no-prototype-builtins
  //   if (errors.hasOwnProperty()) {
  //     setIsOpen(true);
  //   }
  // }, [errors]);

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
