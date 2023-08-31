import styled from 'styled-components';

import { device } from '../../utils/consts';

export const PaddingWrapper = styled.div`
  @media ${device.tablet} {
    padding-right: 5%;
    margin: 0 auto;
  }

  @media ${device.laptop} {
    padding-right: 10%;
  }

  @media ${device.laptopL} {
    padding-right: 15%;
  }

  @media ${device.desktop} {
    width: 1320px;
    padding-right: 0;
  }
`;
