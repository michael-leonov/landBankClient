import React from 'react';
import { AddressSuggestions } from 'react-dadata';

import SearchBarProps from './interface';
import * as S from './styles';

import './styles.css';
import 'react-dadata/dist/react-dadata.css';

const SearchBar = ({ setValue, value }: SearchBarProps) => {
  return (
    <S.SearchBarWrapper>
      <S.SearchBarLabel htmlFor='search'>Введите город, адрес и район</S.SearchBarLabel>
      <AddressSuggestions
        token={process.env.REACT_APP_DADATA_TOKEN as string}
        value={value}
        onChange={setValue}
        delay={500}
        // customInput={S.SearchBarInput}
        // containerClassName='search-bar-input-container'
      />
    </S.SearchBarWrapper>
  );
};

export default SearchBar;
