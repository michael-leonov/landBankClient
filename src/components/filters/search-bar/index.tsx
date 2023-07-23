import React from 'react';
import * as S from './styles';

const SearchBar = () => {
  return (
    <S.SearchBarWrapper>
      <S.SearchBarLabel htmlFor='search'>Введите город, адрес и район</S.SearchBarLabel>
      <S.SearchBarInput id='search' />
    </S.SearchBarWrapper>
  );
};

export default SearchBar;
