import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { device } from '../../../utils/consts';
// import { colors } from '../burger/styles';

export const Menu = styled.div<{ open: boolean }>`
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  position: fixed;
  background-color: #f2f4f6;
  z-index: 3;
  padding: 10px;
  overflow: auto;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};

  @media (min-width: 576px) {
    width: 45vw;
  }
`;

export const LogoWrapper = styled.div`
  width: 200px;
  margin-bottom: 10px;
`;

export const AuthBLock = styled.div`
  display: flex;
  align-items: end;
  column-gap: 10px;
  margin-bottom: 20px;
`;

export const LogoutBtn = styled.button`
  font-size: 10px;

  @media ${device.tablet} {
    font-size: 12px;
  }
`;

export const MenuNav = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
`;

export const MenuLink = styled(Link)`
  color: black;
  width: fit-content;
  font-size: 14px;

  &:hover {
    color: #737a8e;
  }

  @media ${device.tablet} {
    font-size: 16px;
  }
`;
