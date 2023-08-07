import styled from 'styled-components';

import { device } from '../../utils/consts';

export const AdPhotosBlock = styled.div`
  display: none;

  @media ${device.tablet} {
    display: block;
    width: 636px;
  }
`;

export const CurrentAdvImageWrapper = styled.div`
  @media ${device.tablet} {
    margin-bottom: 10px;
  }

  @media ${device.desktop} {
    height: 478px;
    margin-bottom: 30px;
  }
`;

export const CurrentAdvImage = styled.img`
  @media ${device.tablet} {
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
  }
`;

export const AdvImagesList = styled.ul`
  @media ${device.tablet} {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
`;

export const AdvImageWrapper = styled.li<{ active: boolean }>`
  @media ${device.tablet} {
    width: 75px;
    height: 55px;
    cursor: pointer;
    margin: 0 4px 10px 0;

    border: ${({ active }) => active && '2px solid #009ee4'};
  }
`;

export const AdvImage = styled.img`
  width: 100%;
  height: 100%;
`;
