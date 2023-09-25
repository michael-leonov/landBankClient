import { FieldError } from 'react-hook-form';

import styled from 'styled-components';

export const FormInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  margin-bottom: 10px;
`;

export const FormInput = styled.input<{ error: FieldError | undefined; isError: boolean }>`
  border: none;
  border-bottom: 1px solid ${({ error, isError }) => (error || isError ? 'lightcoral' : '#d9d9d9')};
  padding-bottom: 8px;
  outline: none;
  border-radius: unset;
  background-color: transparent;

  &:focus {
    border-bottom: 1px solid black;
  }
`;

export const ErrorSubmitText = styled.p`
  color: lightcoral;
  text-align: center;
`;

export const SuccessTextResponse = styled.p`
  /* color: #57A639; */
  text-align: center;
  margin-bottom: 10px;
`;
