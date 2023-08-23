import React from 'react';

import { landUse } from './options';
import * as S from './styles';
import LandUseFilterTypeProp from './types';

const LandUseFilter = ({ register }: LandUseFilterTypeProp) => {
  return (
    <S.LandUseInputsBlock>
      {landUse.map((category) => (
        <S.LandUseInputWrapper key={category.value}>
          <S.LandUseInputLabel>
            <input
              type='checkbox'
              value={category.value}
              {...register('landUse', {
                required: false,
              })}
            />
            <span>{category.title}</span>
          </S.LandUseInputLabel>
        </S.LandUseInputWrapper>
      ))}
    </S.LandUseInputsBlock>
  );
};

export default LandUseFilter;
