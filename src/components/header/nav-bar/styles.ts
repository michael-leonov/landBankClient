import styled from 'styled-components';
import { device } from '../../../utils/consts';

export const Nav = styled.nav`
  display: none;

  @media ${device.laptop} {
    display: flex;
    column-gap: 10px;
  }
`;
