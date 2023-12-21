import { shake } from 'react-animations';
import { FieldError } from 'react-hook-form';

import styled, { css, keyframes } from 'styled-components';

const shakeAnimation = keyframes`${shake}`;

export const Form = styled.form<{ isAuthError: boolean }>`
  display: flex;
  flex-direction: column;
  row-gap: 16px;

  ${({ isAuthError }) =>
    isAuthError &&
    css`
      animation: 0.7s ${shakeAnimation};
    `}
`;

export const FormInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;

export const FormInput = styled.input<{ error: FieldError | undefined; isAuthError: boolean }>`
  border: none;
  border-bottom: 1px solid
    ${({ error, isAuthError }) => (error || isAuthError ? 'lightcoral' : '#d9d9d9')};
  padding-bottom: 8px;
  outline: none;
  border-radius: unset;
  background-color: transparent;

  &:focus {
    border-bottom: 1px solid black;
  }

  &::placeholder {
    color: ${({ error, isAuthError }) => (error || isAuthError) && 'lightcoral'};
  }

  ${({ error }) =>
    error &&
    css`
      &:focus {
        border-bottom: 1px solid lightcoral;
      }
    `}
`;

export const ErrorSubmitText = styled.span`
  color: lightcoral;
  text-align: center;
`;

export const LoginFormBtnsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;

export const LandUserSubmitInputWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;

export const LandUserSubmitLabel = styled.label`
  font-size: 10px;
  color: #545454;
`;
