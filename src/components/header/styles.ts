import styled from 'styled-components';

import { device } from '../../utils/consts';

export const Header = styled.header`
  position: sticky;
  inset: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 1px 5px 1px rgba(34, 60, 80, 0.2);
  padding: 5px 0;
  margin-bottom: 10px;
  z-index: 2;
`;

export const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AuthLinkWrapper = styled.div`
  display: none;

  @media ${device.laptop} {
    display: flex;
    column-gap: 10px;
  }
`;

export const LogoutBtn = styled.button``;
