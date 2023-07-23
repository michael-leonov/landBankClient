import styled from 'styled-components';
import { device } from '../../utils/consts';

export const AdPhotosBlock = styled.div`
  display: none;

  @media ${device.tablet} {
    display: block;
  }

  @media ${device.desktop} {
    min-width: 480px;
  }
`;

export const CurrentAdvImageWrapper = styled.div`
  @media ${device.desktop} {
    width: 480px;
    height: 480px;
    margin-bottom: 30px;
  }
`;

export const CurrentAdvImage = styled.img`
  width: 100%;

  height: 480px;
`;

export const AdvImagesList = styled.div`
  display: flex;
  column-gap: 10px;
`;

export const AdvImageWrapper = styled.div<{ active: boolean }>`
  width: 88px;
  height: 88px;
  cursor: pointer;

  border: ${({ active }) => active && '2px solid #009ee4'};
`;

export const AdvImage = styled.img`
  width: 100%;
  height: 100%;
`;
