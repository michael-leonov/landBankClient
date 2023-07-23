import styled from 'styled-components';

export const CustomButton = styled.button`
  border-radius: 6px;
  cursor: pointer;
  font-weight: 400;
  transition:
    background-color 0.2s ease-in,
    color 0.2s ease-in;
  padding: 4px 10px;
`;

export const PrimaryBtn = styled(CustomButton)`
  background-color: #1c1c1c;
  border: none;
  color: white;

  :hover {
    background-color: #181513;
  }
`;

export const OutlinedBtn = styled(CustomButton)`
  border: 1px solid #d9d9d9;
  color: rgba(0, 0, 0, 0.85);
  background-color: #fff;

  :hover {
    background-color: #181513;
  }
`;
