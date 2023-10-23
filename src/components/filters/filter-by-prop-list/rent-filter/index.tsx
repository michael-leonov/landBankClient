import React from 'react';

import { rents } from '../../../../utils/consts';
import * as S from './styles';
import RentFilterTypeProp from './types';

const RentFilter = ({ register }: RentFilterTypeProp) => {
  return (
    <S.RentInputsBlock>
      {rents.map((rent) => (
        <S.RentInputWrapper key={rent.title}>
          <S.RentInputLabel>
            <input
              type='radio'
              value={rent.value}
              {...register('isRent', {
                required: false,
              })}
            />
            <span>{rent.title}</span>
          </S.RentInputLabel>
        </S.RentInputWrapper>
      ))}
    </S.RentInputsBlock>
  );
};

export default RentFilter;
