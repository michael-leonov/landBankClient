/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import filterIcon from '../../../assets/setting.png';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import { useAppDispatch } from '../../../redux/hooks';
import { resetFiltersAds, setFiltersAds } from '../../../redux/slices/filtersAdsSlice';
import { Overlay } from '../../../styles/common-styled-components/styles';
import CustomButton from '../../custom-button';
import FiltersByPropList from '../filter-by-prop-list';
import FormValues from '../types';
import * as S from './styles';

const FilterMenu = () => {
  const [open, setOpen] = useState<boolean>(false);

  const {
    formState: { errors },
    formState,
    handleSubmit,
    register,
    reset,
  } = useForm<FormValues>();

  const node = useRef<HTMLDivElement>(null);

  const close = (): void => setOpen(false);

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(setFiltersAds(data));
    close();
  };

  const onReset = (): void => {
    reset();
    dispatch(resetFiltersAds());
  };

  useOnClickOutside(node, () => setOpen(false));

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
  }, [open]);

  return (
    <>
      <div ref={node}>
        <S.Menu open={open}>
          <S.CloseBtn onClick={() => close()} />

          <S.MenuTitle>Фильтры</S.MenuTitle>
          <S.FilterForm onSubmit={handleSubmit(onSubmit)}>
            <S.FilterListWrapper>
              <FiltersByPropList register={register} />
            </S.FilterListWrapper>
            <S.FormButtonsWrapper>
              <CustomButton disabled={false} type='submit'>
                Показать
              </CustomButton>
              <CustomButton disabled={false} type='button' variant='outlined' onClick={onReset}>
                Сбросить фильтры
              </CustomButton>
            </S.FormButtonsWrapper>
          </S.FilterForm>
        </S.Menu>
        <S.MobFilterIconWrapper onClick={() => setOpen(!open)}>
          <img src={filterIcon} width={40} />
        </S.MobFilterIconWrapper>
      </div>
      {open && <Overlay />}
    </>
  );
};

export default FilterMenu;
