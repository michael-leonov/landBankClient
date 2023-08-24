/* eslint-disable no-console */
import React from 'react';

import postiveValidationHandler from '../../../../utils/funcs/positiveValidtaionHandler';
import * as S from './styles';
import PriceFilterTypeProp from './types';

const PriceFilter = ({ register }: PriceFilterTypeProp) => {
  return (
    <S.PriceInputsWrapper>
      <S.PriceInput
        placeholder='от'
        type='number'
        {...register('priceFrom', {
          required: false,
          validate: {
            moreThenMax: (value, formValues) => {
              if (formValues.priceTo && value) {
                return (
                  Number(formValues.priceTo) >= Number(value) ||
                  'Максимальная цена не можеть быть ниже минимальной!'
                );
              }
            },
            positive: (value) =>
              postiveValidationHandler('Минимальная должна быть больше нуля!', value),
          },
        })}
      />
      <div />
      <S.PriceInput
        placeholder='до'
        type='number'
        {...register('priceTo', {
          required: false,
          validate: {
            lessThenMin: (value, formValues) => {
              if (formValues.priceFrom && value) {
                return (
                  Number(formValues.priceFrom) <= Number(value) ||
                  'Максимальная цена не можеть быть ниже минимальной!'
                );
              }
            },

            positive: (value) =>
              postiveValidationHandler('Максимальная цена должна быть больше нуля!', value),
          },
        })}
      />
    </S.PriceInputsWrapper>
  );
};

export default PriceFilter;
