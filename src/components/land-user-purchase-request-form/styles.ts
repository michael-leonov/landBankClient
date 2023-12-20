import styled, { css } from 'styled-components';

import { device } from '../../utils/consts';
import * as stylesFromAdForm from '../ad-mutation-form/styles';
import * as stylesFromFilters from '../filters/filter-by-prop-list/price-filter/styles';

export const Form = styled.form<{ isEditStatusForm: boolean }>`
  max-width: 400px;
  margin: 0 auto;
  position: relative;

  ${({ isEditStatusForm }) =>
    isEditStatusForm &&
    css`
      padding: 24px 6px 6px;

      @media ${device.tablet} {
        padding: 30px 20px 20px;
      }
    `};
`;

export const AreaInputsWrapper = styled(stylesFromFilters.PriceInputsWrapper)`
  margin-bottom: 10px;
`;

export const AreaInput = styled(stylesFromFilters.PriceInput)``;

export const PriceInputsWrapper = styled(AreaInputsWrapper)``;

export const PriceInput = styled(AreaInput)``;

export const Fieldset = styled(stylesFromAdForm.Fieldset)`
  margin-bottom: 10px;
`;

export const FieldsetInputWrapper = styled(stylesFromAdForm.FieldsetInputWrapper)``;

export const InputWrapper = styled(stylesFromAdForm.InputWrapper)``;

export const Input = styled(stylesFromAdForm.Input)``;

export const InputMasked = styled(stylesFromAdForm.InputMasked)``;

export const ErrorFormMsg = styled(stylesFromAdForm.ErrorFormMsg)``;
