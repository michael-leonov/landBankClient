import { NavLink } from 'react-router-dom';

import styled, { css } from 'styled-components';

import { device } from '../../../utils/consts';

export const SideBarNav = styled.nav`
  padding: 8px;
  margin-bottom: 20px;

  @media ${device.tablet} {
    display: none;
  }
`;

export const NavSlide = styled.div`
  background-color: white;
  padding: 6px 16px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Link = styled(NavLink)<{ active: boolean }>`
  font-size: 12 px;
  ${({ active }) =>
    active &&
    css`
      font-weight: 700;
      color: black;
    `}
`;
