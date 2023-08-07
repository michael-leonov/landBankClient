import { shake } from 'react-animations';
import { FieldError } from 'react-hook-form';

import styled, { css, keyframes } from 'styled-components';

const shakeAnimation = keyframes`${shake}`;

export const Form = styled.form<{ isautherror: boolean }>`
  display: flex;
  flex-direction: column;
  row-gap: 16px;

  ${({ isautherror }) =>
    isautherror &&
    css`
      animation: 0.7s ${shakeAnimation};
    `}
`;

export const FormInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;

export const FormInput = styled.input<{ error: FieldError | undefined; isautherror: boolean }>`
  border: none;
  border-bottom: 1px solid
    ${({ error, isautherror }) => (error || isautherror ? 'lightcoral' : '#d9d9d9')};
  padding-bottom: 8px;
  outline: none;
  border-radius: unset;
  background-color: transparent;

  &:focus {
    border-bottom: 1px solid black;
  }

  &::placeholder {
    color: ${({ error, isautherror }) => (error || isautherror) && 'lightcoral'};
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
