/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { DaDataAddress, DaDataSuggestion } from 'react-dadata';
import { useForm, SubmitHandler } from 'react-hook-form';

import loupeIcon from '../../assets/search.png';
import { useAppDispatch } from '../../redux/hooks';
import { setFiltersAds } from '../../redux/slices/filtersAdsSlice';
import { StyledContainer, StyledSection } from '../../styles/common-styled-components/styles';
import CustomButton from '../custom-button';
import FiltersByPropList from './filter-by-prop-list';
import FilterMenu from './filter-menu';
import SearchBar from './search-bar';
import * as S from './styles';
import FormValues from './types';

const Filters = () => {
  const [searchInputValue, setSearchInputValue] = useState<DaDataSuggestion<DaDataAddress>>();

  const dispatch = useAppDispatch();

  const {
    formState: { errors },
    formState,
    handleSubmit,
    register,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(setFiltersAds({ ...data, address: searchInputValue?.value }));

    // eslint-disable-next-line no-console
    console.log(searchInputValue);
  };

  return (
    <StyledSection>
      <StyledContainer>
        <S.SearchBlock>
          <SearchBar value={searchInputValue} setValue={setSearchInputValue} />
          <S.FilterListWrapper>
            <FiltersByPropList register={register} />
          </S.FilterListWrapper>

          <FilterMenu />
          <S.MobSearchBtnWrapper>
            <CustomButton disabled={false} variant='outlined'>
              <img src={loupeIcon} width={25} height={25} />
            </CustomButton>
          </S.MobSearchBtnWrapper>
          <S.SearchBtnWrapper>
            <CustomButton disabled={false} type='button' onClick={handleSubmit(onSubmit)}>
              Найти
            </CustomButton>
          </S.SearchBtnWrapper>
        </S.SearchBlock>
      </StyledContainer>
    </StyledSection>
  );
};

export default Filters;
