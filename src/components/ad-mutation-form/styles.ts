import InputMask from 'react-input-mask';

import styled, { css } from 'styled-components';

import { device } from '../../utils/consts';

export const Form = styled.form<{ isEditStatusForm: boolean }>`
  max-width: 400px;
  margin: 0 auto;

  ${({ isEditStatusForm }) =>
    isEditStatusForm &&
    css`
      padding: 24px 6px 6px;

      @media ${device.tablet} {
        padding: 30px 20px 20px;
      }
    `}
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

  &:disabled {
    background-color: #ccc;
  }
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

export const PreviewAdvImageWrapper = styled.div<{ isEditStatusForm: boolean }>`
  cursor: pointer;
  width: ${({ isEditStatusForm }) => (isEditStatusForm ? '80px' : '100px')};
  height: ${({ isEditStatusForm }) => (isEditStatusForm ? '80px' : '100px')};
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

  ${({ isEditStatusForm }) =>
    isEditStatusForm &&
    css`
      @media ${device.tablet} {
        width: 100px;
        height: 100px;
      }
    `}
`;

export const PreviewAdvImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const PlusIcon = styled.img<{ isEditStatusForm: boolean }>`
  width: ${({ isEditStatusForm }) => (isEditStatusForm ? '80px' : '100px')};
  height: ${({ isEditStatusForm }) => (isEditStatusForm ? '80px' : '100px')};
  cursor: pointer;

  ${({ isEditStatusForm }) =>
    isEditStatusForm &&
    css`
      @media ${device.tablet} {
        width: 100px;
        height: 100px;
      }
    `}
`;

export const ErrorFormMsg = styled.p`
  color: lightcoral;
  text-align: center;
`;

export const CadastralInputBlock = styled.div`
  position: relative;
`;

export const CadastralResultsListWrapper = styled.div`
  max-height: 300px;
  width: 100%;
  position: absolute;
  top: 65px;
  left: 0;
  background-color: #fff;
  z-index: 3;
  box-shadow: 0 0 5px 0 #ddd;
  overflow-x: hidden;
  padding: 10px;
  border-radius: 6px;
`;

export const CadastralObject = styled.li`
  padding: 6px;
  padding-bottom: 12px;
  /* border-bottom: 1px solid black; */
  cursor: pointer;
`;

export const AddressInputBlock = styled(CadastralInputBlock)``;

export const AddressSuggetionsList = styled(CadastralResultsListWrapper)``;

export const AddresSuggetion = styled(CadastralObject)``;

export const MutationBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
