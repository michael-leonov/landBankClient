import styled from 'styled-components';
import { device } from '../../utils/consts';

export const HomeBlockList = styled.div`
  display: grid;
  flex-direction: column;
  row-gap: 10px;

  @media ${device.tablet} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }

  @media ${device.laptopL} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;
