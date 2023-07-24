import React from 'react';

import { StyledContainer, StyledSection } from '../../styles/common-styled-components/styles';
import CustomButton from '../custom-button';
import SearchBar from './search-bar';
import * as S from './styles';

const Filters = () => {
  return (
    <StyledSection>
      <StyledContainer>
        <S.SearchBlock>
          <SearchBar />
          <CustomButton disabled={false}>Найти</CustomButton>
        </S.SearchBlock>
      </StyledContainer>
    </StyledSection>
  );
};

export default Filters;
