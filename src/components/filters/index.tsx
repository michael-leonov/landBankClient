import React from 'react';
import SearchBar from './search-bar';
import { StyledContainer, StyledSection } from '../../styles/common-styled-components/styles';
import CustomButton from '../custom-button';
import * as S from './styles';

const Filters = () => {
  return (
    <StyledSection>
      <StyledContainer>
        <form>
          <S.SearchBlock>
            <SearchBar />
            <CustomButton disabled={false}>Найти</CustomButton>
          </S.SearchBlock>
        </form>
      </StyledContainer>
    </StyledSection>
  );
};

export default Filters;
