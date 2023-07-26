import styled from 'styled-components';

import { device } from '../../../utils/consts';

export const Menu = styled.div<{ open: boolean }>`
  top: 0;
  left: 0;
  height: 100vh;
  width: 320px;
  position: fixed;
  background-color: #f2f4f6;
  z-index: 3;
  padding-top: 10px;
  overflow: auto;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};

  @media (min-width: 576px) {
    width: 40vw;
  }

  @media ${device.tablet} {
    width: 30vw;
  }
`;

export const CloseBtn = styled.div`
  position: absolute;
  right: 20px;
  top: 10px;
  width: 32px;
  height: 32px;
  opacity: 0.3;

  &::before,
  &::after {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 33px;
    width: 2px;
    background-color: #333;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;

export const MenuTitle = styled.p`
  padding: 10px 20px 17px;
`;

export const FilterForm = styled.form``;

export const FilterListWrapper = styled.div`
  @media ${device.laptop} {
    display: none;
  }
`;

export const FormButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  position: fixed;
  width: 100%;
  bottom: 0;
  padding: 20px 20px 40px 20px;
  box-shadow: 0 -3px 3px rgba(0, 0, 0, 0.07);
  background: #fff;
  z-index: 10;
`;

export const MobFilterIconWrapper = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  margin-right: 6px;
  border-radius: 6px;

  @media ${device.laptop} {
    display: none;
  }
`;
