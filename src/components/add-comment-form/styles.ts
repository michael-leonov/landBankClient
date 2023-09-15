import styled from 'styled-components';

export const Form = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 10px;
  padding-top: 30px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  padding: 4px;
`;

export const TextArea = styled.textarea`
  border: 1px solid #b9c2c8;
  border-radius: 5px;
  padding: 8px 6px;
  margin-bottom: 10px;
`;

export const ErrorFormMsg = styled.p`
  color: lightcoral;
  text-align: center;
`;
