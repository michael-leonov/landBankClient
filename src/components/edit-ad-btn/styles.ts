import styled from 'styled-components';

export const EditFormWrapper = styled.div`
  background-color: #fff;
  z-index: 3;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 400px;
  width: 90%;
  height: 90%;
  overflow-y: scroll;
`;

export const CloseFormBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition:
    background-color 0.3s ease-in-out,
    border-radius 0.3s ease-in-out;

  &::before,
  &::after {
    height: 1px;
    position: absolute;
    width: 80%;
    content: '';
    background-color: black;
    top: 14px;
    left: 3px;
  }

  &::before {
    rotate: 45deg;
  }

  &::after {
    rotate: -45deg;
  }

  &:hover {
    background-color: #545454;
    border-radius: 50%;

    &::before,
    &::after {
      background-color: white;
    }
  }
`;
