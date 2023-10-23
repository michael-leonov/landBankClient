import React from 'react';

import { landCategories } from '../../../../utils/consts';
import * as S from './styles';
import LandCategoryFilterTypeProp from './types';

const LandCategoryFilter = ({ register }: LandCategoryFilterTypeProp) => {
  return (
    <S.LandCategoryInputsBlock>
      {landCategories.map((category) => (
        <S.LandCategoryInputWrapper key={category.value}>
          <S.LandCategoryInputLabel>
            <input
              type='checkbox'
              value={category.value}
              {...register('landCategory', {
                required: false,
              })}
            />
            <span>{category.title}</span>
          </S.LandCategoryInputLabel>
        </S.LandCategoryInputWrapper>
      ))}
    </S.LandCategoryInputsBlock>
  );
};

export default LandCategoryFilter;
