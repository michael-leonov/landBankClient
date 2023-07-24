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
  }

  @media ${device.desktop} {
    width: 480px;
    height: 480px;
    margin-bottom: 30px;
  }
`;

export const CurrentAdvImage = styled.img`
  @media ${device.tablet} {
    width: 100%;
    max-width: 100%;
    height: auto;
    max-height: 100%;
  }
`;

export const AdvImagesList = styled.ul`
  @media ${device.tablet} {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    /* column-gap: 10px; */
  }
`;

export const AdvImageWrapper = styled.li<{ active: boolean }>`
  @media ${device.tablet} {
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
