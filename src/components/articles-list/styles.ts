import styled from 'styled-components';

import { device } from '../../utils/consts';

export const ArticleList = styled.div`
  display: grid;
  flex-direction: column;
  row-gap: 10px;
  margin-top: 10px;

  @media ${device.laptopL} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }
`;

export const SkeletonWrapper = styled(ArticleList)``;
