import { NavLink } from 'react-router-dom';

import styled, { css } from 'styled-components';

import { device } from '../../utils/consts';

export const SideNav = styled.nav`
  display: none;

  @media ${device.tablet} {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    width: 140px;
    position: fixed;
    z-index: 1;
    top: 160px;
    left: 10px;
    overflow-x: hidden;
    padding: 10px;
    background-color: #fff;
    border-radius: 8px;
  }
`;

export const SideNavLink = styled(NavLink)<{ active: boolean }>`
  word-wrap: break-word;
  @media ${device.tablet} {
    ${({ active }) =>
      active &&
      css`
        font-weight: 700;
        color: black;
      `}
  }
`;
