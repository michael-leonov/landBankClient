import styled from 'styled-components';

import { device } from '../../utils/consts';

export const ListRequestAnnouncementWrapper = styled.div`
  display: grid;
  flex-direction: column;
  row-gap: 10px;
  margin: 20px 0;

  @media ${device.tablet} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
  }

  @media ${device.laptopL} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
  }
`;
