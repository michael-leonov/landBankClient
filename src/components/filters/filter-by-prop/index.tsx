/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';

import FilterByPropProps from './interface';
import * as S from './styles';

const FilterByProp = ({
  activeKey,
  children,
  errors,
  filterName,
  setActiveKey,
}: FilterByPropProps) => {
  // TODO: Открывать при ошибке формы с фильтром и закрывать при отправке формы
  // useEffect(() => {
  //   // eslint-disable-next-line no-prototype-builtins
  //   if (errors.hasOwnProperty()) {
  //     setIsOpen(true);
  //   }
  // }, [errors]);

  const isActive = activeKey === filterName;

  const activeFilterPopUpHandler = () => {
    if (activeKey === filterName) {
      setActiveKey('');
    } else {
      setActiveKey(filterName);
    }
  };

  return (
    <S.FilterBlock>
      <S.FilterBtn onClick={activeFilterPopUpHandler} open={isActive} type='button'>
        <span>{filterName}</span>
      </S.FilterBtn>

      {isActive && <div>{children}</div>}
    </S.FilterBlock>
  );
};

export default FilterByProp;
