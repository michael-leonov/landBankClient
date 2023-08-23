import React from 'react';

import * as S from './styles';
import SourceFilterTypeProp from './types';

const SourceFilter = ({ register }: SourceFilterTypeProp) => {
  return (
    <S.SourceInputsBlock>
      <S.SourceInputWrapper>
        <S.SourceInputLabel>
          <input
            type='checkbox'
            value='cian.ru'
            {...register('domain', {
              required: false,
            })}
          />
          <span>Циан</span>
        </S.SourceInputLabel>
      </S.SourceInputWrapper>
      <S.SourceInputWrapper>
        <S.SourceInputLabel>
          <input
            type='checkbox'
            value='avito.ru'
            {...register('domain', {
              required: false,
            })}
          />
          <span>Авито</span>
        </S.SourceInputLabel>
      </S.SourceInputWrapper>
    </S.SourceInputsBlock>
  );
};

export default SourceFilter;
