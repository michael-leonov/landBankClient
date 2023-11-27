import React, { useState, useRef, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  resetFiltersAds,
  selectFilterAds,
  setFiltersAds,
} from '../../redux/slices/filtersAdsSlice';
import { Overlay } from '../../styles/common-styled-components/styles';
import CustomButton from '../custom-button';
import AddressFilter from './address-filter';
import FiltersByPropList from './filter-by-prop-list';
import * as S from './styles';
import FormValues from './types';

const Filters = () => {
  const [open, setOpen] = useState<boolean>(false);

  const filtersAds = useAppSelector(selectFilterAds);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<FormValues>({
    mode: 'all',
  });

  const node = useRef<HTMLDivElement>(null);

  const close = (): void => setOpen(false);

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(setFiltersAds({ ...filtersAds, ...data }));
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
              <FiltersByPropList register={register} errors={errors} setValue={setValue} />
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
        <S.FilterBtnsWrapper>
          <div>
            <CustomButton onClick={() => setOpen(!open)} disabled={false} variant='outlined'>
              Фильтры
            </CustomButton>
          </div>

          <AddressFilter register={register} onSubmit={handleSubmit(onSubmit)} />
        </S.FilterBtnsWrapper>
      </div>
      {open && <Overlay />}
    </>
  );
};

export default Filters;
