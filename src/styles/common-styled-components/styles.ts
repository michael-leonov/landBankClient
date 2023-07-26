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

export const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;
