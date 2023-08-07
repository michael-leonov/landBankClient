import styled from 'styled-components';

import { device } from '../../utils/consts';

export const CardsList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;

  @media ${device.tablet} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
  }

  @media ${device.laptopL} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px;
  }

  @media ${device.desktop} {
    gap: 20px;
  }
`;

export const SkeletonWrapper = styled(CardsList)``;
