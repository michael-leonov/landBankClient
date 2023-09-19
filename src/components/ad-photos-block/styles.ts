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
    position: relative;
    display: inline-block;
    overflow: hidden;
    width: 100%;
    height: 478px;
    border: 0.5px solid black;
    text-align: center;

    &::after {
      position: absolute;
      inset: 0;
      content: '';
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.12);
      filter: blur(20px);
    }

    &::before {
      display: inline-block;
      height: 100%;
      content: '';
      vertical-align: middle;
    }
  }

  @media ${device.desktop} {
    height: 478px;
    margin-bottom: 30px;
  }
`;

export const CurrentAdvImage = styled.img`
  @media ${device.tablet} {
    max-width: 100%;
    height: auto;
    max-height: 100%;
    box-sizing: border-box;
    vertical-align: middle;
    display: inline-block;
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

    border: ${({ active }) => active && '2px solid #150754'};
  }
`;

export const AdvImage = styled.img`
  width: 100%;
  height: 100%;
`;
