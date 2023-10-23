import React from 'react';

import { dates } from '../../../../utils/consts';
import * as S from './styles';
import DatePublishedFilterTypeProp from './types';

const DatePublishedFilter = ({ register }: DatePublishedFilterTypeProp) => {
  return (
    <S.DatePublishedInputsBlock>
      {dates.map((date) => (
        <S.DatePublishedInputWrapper key={date.value}>
          <S.DatePublishedInputLabel>
            <input
              type='radio'
              value={date.value}
              {...register('dateRange', {
                required: false,
              })}
            />
            <span>{date.title}</span>
          </S.DatePublishedInputLabel>
        </S.DatePublishedInputWrapper>
      ))}
    </S.DatePublishedInputsBlock>
  );
};

export default DatePublishedFilter;
