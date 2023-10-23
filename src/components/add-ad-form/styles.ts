import InputMask from 'react-input-mask';

import styled from 'styled-components';

export const Form = styled.form`
  max-width: 400px;
  margin: 0 auto;
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
  width: 100%;
`;

export const InputMasked = styled(InputMask)`
  border: 1px solid #b9c2c8;
  border-radius: 5px;
  padding: 8px 6px;
  width: 100%;
`;

export const TextArea = styled.textarea`
  border: 1px solid #b9c2c8;
  border-radius: 5px;
  padding: 8px 6px;
`;

export const Fieldset = styled.fieldset`
  border: 1px solid #b9c2c8;
  padding: 8px 6px;
`;

export const FieldsetInputWrapper = styled.div`
  display: flex;
  column-gap: 6px;
  padding: 4px;
`;

export const FormInputFile = styled.input`
  display: none;
`;

export const AdvImagesWrapper = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
`;

export const PreviewAdvImageWrapper = styled.div`
  cursor: pointer;
  width: 100px;
  height: 100px;
  position: relative;

  &::before {
    content: 'x';
    position: absolute;
    color: white;
    top: 35%;
    left: 56%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    z-index: 1;
    height: 30px;
    width: 30px;
    font-size: 40px;
  }

  &::after {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  &:hover {
    &::before,
    &::after {
      opacity: 1;
    }
  }
`;

export const PreviewAdvImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const PlusIcon = styled.img`
  width: 100px;
  height: 100px;
  cursor: pointer;
`;

export const ErrorFormMsg = styled.p`
  color: lightcoral;
  text-align: center;
`;
