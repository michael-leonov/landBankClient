import React, { useEffect, useRef, useState } from 'react';

import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import { Overlay } from '../../../styles/common-styled-components/styles';
import reduceRegionByName from '../../../utils/funcs/reduceRegionByName';
import CustomButton from '../../custom-button';
import EnumAreas from './enum-areas';
import FilterEnumAreas from './filter-enum-areas';
import AddressFilterProps from './interface';
import * as S from './styles';

const AddressFilter = ({ onSubmit, register }: AddressFilterProps) => {
  const [isShowAddressFilter, setIsShowAddressFilter] = useState<boolean>(false);

  const [regionSelected, setRegionSelected] = useState<string>('');

  const lettersArr = Object.keys(reduceRegionByName()).sort();

  useEffect(() => {
    document.body.style.overflow = isShowAddressFilter ? 'hidden' : 'auto';
  }, [isShowAddressFilter]);

  const node = useRef<HTMLDivElement>(null);

  useOnClickOutside(node, () => setIsShowAddressFilter(false));

  const onSearchAddressHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onSubmit(e);
    setIsShowAddressFilter(false);
  };

  return (
    <>
      <CustomButton
        variant='outlined'
        onClick={() => setIsShowAddressFilter(true)}
        disabled={false}
      >
        Поиск по адресу
      </CustomButton>
      {isShowAddressFilter && (
        <>
          <S.AddressFilterWrapper ref={node}>
            <FilterEnumAreas
              lettersArr={lettersArr}
              setRegionSelected={setRegionSelected}
              regionSelected={regionSelected}
            />
            <EnumAreas
              register={register}
              lettersArr={lettersArr}
              regionSelected={regionSelected}
            />
            <S.AddressSearchBtnWrapper>
              <CustomButton variant='outlined' disabled={false} onClick={onSearchAddressHandler}>
                Найти
              </CustomButton>
            </S.AddressSearchBtnWrapper>
            {regionSelected && (
              <S.AddressSearchBtnWrapper>
                <CustomButton
                  variant='outlined'
                  disabled={false}
                  onClick={() => setRegionSelected('')}
                >
                  Сбросить
                </CustomButton>
              </S.AddressSearchBtnWrapper>
            )}
          </S.AddressFilterWrapper>

          <Overlay />
        </>
      )}
    </>
  );
};

export default AddressFilter;
