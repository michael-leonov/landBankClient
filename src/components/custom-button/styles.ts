import styled from 'styled-components';

export const CustomButton = styled.button`
  border-radius: 6px;
  cursor: pointer;
  font-weight: 400;
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
  padding: 4px 10px;
  text-align: center;
  padding: 10px 12px;
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
  display: block;
  font-size: 14px;

  &:disabled {
    opacity: 0.3;
    cursor: auto;

    &:hover {
      background-color: #fff;
    }
  }
`;

export const PrimaryBtn = styled(CustomButton)`
  background-color: #1c1c1c;
  border: none;
  color: white;

  &:hover {
    background-color: #545454;
  }

  &:active {
    background-color: #8e8e8e;
  }
`;

export const OutlinedBtn = styled(CustomButton)`
  border: 1px solid #d9d9d9;
  color: rgba(0, 0, 0, 0.85);
  background-color: #fff;

  &:hover {
    background-color: ghostwhite;
  }

  &:active {
    background-color: #8e8e8e;
  }
`;
