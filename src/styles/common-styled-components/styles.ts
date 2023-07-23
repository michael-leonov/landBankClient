import styled from 'styled-components';
import { device } from '../../utils/consts';

export const StyledContainer = styled.div`
  width: 100%;
  padding: 0 10px;
  margin: 0 auto;

  @media ${device.tablet} {
    width: 720px;
    padding: 0 16px;
  }

  @media ${device.laptop} {
    width: 964px;
    padding: 0 18px;
  }

  @media ${device.laptopL} {
    width: 1170px;
    padding: 0 20px;
  }

  @media ${device.desktop} {
    width: 1320px;
    padding: 0 24px;
  }
`;

export const StyledSection = styled.section`
  margin-bottom: 24px;

  @media ${device.tablet} {
    margin-bottom: 36px;
  }

  @media ${device.desktop} {
    margin-bottom: 48px;
  }
`;
