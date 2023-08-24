import React from 'react';

import * as S from './styles';
import SearchBarTypeProp from './types';

const SearchBar = ({ register }: SearchBarTypeProp) => {
  return (
    <S.SearchBarWrapper>
      <S.SearchBar
        placeholder='Cлова в описании'
        {...register('keyword', {
          required: false,
        })}
      />
    </S.SearchBarWrapper>
  );
};

export default SearchBar;
