import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { device } from '../../../utils/consts';
import { colors } from '../burger/styles';

export const Menu = styled.div<{ open: boolean }>`
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  position: fixed;
  background-color: #f2f4f6;
  z-index: 1;
  padding: 10px;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};

  @media (min-width: 576px) {
    width: 40vw;
  }

  @media ${device.tablet} {
    width: 45vw;
  }
`;

export const MenuNav = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MenuLink = styled(Link)`
  color: black;

  &:hover {
    color: ${colors.yellowmellow};
  }
`;
