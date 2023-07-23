import styled from 'styled-components';
import { device } from '../../../utils/consts';

export const AuthTextWrapp = styled.div`
  display: flex;
  align-items: center;
  column-gap: 4px;

  @media ${device.tablet} {
  }

  @media ${device.laptopL} {
  }

  @media ${device.desktop} {
  }
`;

export const AuthIcon = styled.img`
  width: 16px;
  height: 16px;
`;

export const AuthText = styled.span`
  font-size: 10px;
`;
