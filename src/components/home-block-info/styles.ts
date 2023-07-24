import styled from 'styled-components';

import { device } from '../../utils/consts';

export const Wrapper = styled.div`
  border: 1px solid #e4e4e4;
  border-radius: 6px;
`;

export const Img = styled.img`
  height: 30vw;
  width: 100%;

  @media ${device.tablet} {
    height: 150px;
  }
`;

export const InfoWrapper = styled.div`
  padding: 10px;
`;
