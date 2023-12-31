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
    getValues,
    handleSubmit,
    register,
  } = useForm<FormValues>({ mode: 'all' });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(setFiltersAds({ ...data, address: searchInputValue?.value }));
  };

  return (
    <StyledSection>
      <StyledContainer>
        <S.SearchBlock>
          <SearchBar value={searchInputValue} setValue={setSearchInputValue} />
          <S.FilterListWrapper>
            <FiltersByPropList register={register} errors={errors} getValues={getValues} />
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
