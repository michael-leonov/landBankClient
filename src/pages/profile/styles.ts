import styled from 'styled-components';

import { device } from '../../utils/consts';

export const MarginWrapper = styled.div`
  padding: 0 10px;

  @media ${device.tablet} {
    margin-left: 150px;
    padding: 0 10px;
  }

  @media ${device.laptopL} {
    padding-left: 100px;
  }

  @media ${device.desktop} {
    padding-left: 0;
  }
`;
