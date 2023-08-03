import { FieldError } from 'react-hook-form';

import styled, { css } from 'styled-components';

export const FormTitle = styled.h1`
  margin-bottom: 20px;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

export const FormInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;

export const FormInput = styled.input<{ error: FieldError | undefined }>`
  border: none;
  border-bottom: 1px solid ${({ error }) => (error ? 'lightcoral' : '#d9d9d9')};
  padding-bottom: 8px;
  outline: none;
  border-radius: unset;
  background-color: transparent;

  &:focus {
    border-bottom: 1px solid black;
  }

  &::placeholder {
    color: ${({ error }) => error && 'lightcoral'};
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
`;

export const LoginFormBtnsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;
