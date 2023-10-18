import styled from 'styled-components';

export const Form = styled.form`
  padding: 10px;
  padding-top: 20px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2px;
  padding: 4px;
`;

export const Input = styled.input`
  border: 1px solid #b9c2c8;
  border-radius: 5px;
  padding: 8px 6px;
`;

export const TextArea = styled.textarea`
  border: 1px solid #b9c2c8;
  border-radius: 5px;
  padding: 8px 6px;
`;

export const Fieldset = styled.fieldset`
  border: 1px solid #b9c2c8;
  padding: 8px 6px;
  margin-bottom: 10px;
`;

export const FieldsetInputWrapper = styled.div`
  display: flex;
  column-gap: 6px;
  padding: 4px;
`;

export const ErrorFormMsg = styled.p`
  color: lightcoral;
  text-align: center;
`;

export const SubmitBtnWrapper = styled.div`
  max-width: 250px;
  margin: 0 auto;
`;
