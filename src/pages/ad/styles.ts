import styled from 'styled-components';

import { device } from '../../utils/consts';

export const BackToSearchBtnWrapper = styled.div`
  margin-bottom: 10px;
  max-width: 100px;
`;

export const MobContentLoaderWrapper = styled.div`
  @media ${device.tablet} {
    display: none;
  }
`;

export const ContentLoaderWrapper = styled.div`
  display: none;

  @media ${device.tablet} {
    display: block;
  }
`;
