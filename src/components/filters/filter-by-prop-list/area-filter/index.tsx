import React from 'react';

import postiveValidationHandler from '../../../../utils/funcs/positiveValidtaionHandler';
import * as S from './styles';
import AreaFilterTypeProp from './types';

const AreaFilter = ({ register }: AreaFilterTypeProp) => {
  return (
    <S.AreaInputsWrapper>
      <S.AreaInput
        placeholder='от'
        type='number'
        {...register('areaFrom', {
          required: false,
          validate: {
            moreThenMax: (value, formValues) => {
              if (formValues.areaTo && value) {
                return (
                  Number(formValues.areaTo) >= Number(value) ||
                  'Максимальная площадь не можеть быть ниже минимальной!'
                );
              }
            },
            positive: (value) =>
              postiveValidationHandler('Минимальная площадь должна быть больше нуля!', value),
          },
        })}
      />
      <div />
      <S.AreaInput
        placeholder='до'
        type='number'
        {...register('areaTo', {
          required: false,
          validate: {
            lessThenMin: (value, formValues) => {
              if (formValues.areaFrom && value) {
                return (
                  Number(formValues.areaFrom) <= Number(value) ||
                  'Максимальная площадь не можеть быть ниже минимальной!'
                );
              }
            },
            positive: (value) =>
              postiveValidationHandler('Максимальная площадь должна быть больше нуля!', value),
          },
        })}
      />
    </S.AreaInputsWrapper>
  );
};

export default AreaFilter;
