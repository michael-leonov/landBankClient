import styled from 'styled-components';

import { device } from '../../../utils/consts';

export const PopUpAd = styled.div<{
  isVisiblePopUp: boolean;
}>`
  width: 100%;
  height: 36vh;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  border-radius: 6px 6px 0 0;
  padding: 10px;
  padding-top: 20px;
  overflow-y: auto;
  transition: transform 300ms ease 0s;
  transform: ${({ isVisiblePopUp }) =>
    `translate3d(0px, ${isVisiblePopUp ? '0px' : '190px'}, 0px);`};

  @media ${device.laptop} {
    position: absolute;
    top: 10%;
    left: 5%;
    width: 480px;
    height: fit-content;
    border-radius: 8px;
    padding: 12px;

    transform: ${({ isVisiblePopUp }) =>
      `translate3d(0px, ${isVisiblePopUp ? '0px' : '-1000px'}, 0px);`};
  }
`;

// export const Marker = styled.div`
//   position: absolute;
//   top: 10px;
//   left: 50%;
//   transform: translateX(-50%);

//   &::after {
//     content: '';
//     display: block;
//     height: 4px;
//     width: 40px;
//     background-color: grey;
//     border-radius: 6px;
//     opacity: 0.2;
//   }

//   @media ${device.laptop} {
//     display: none;
//   }
// `;

export const CloseBtn = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
  width: 20px;
  height: 20px;
  opacity: 0.3;
  cursor: pointer;

  &::before,
  &::after {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 20px;
    width: 2px;
    background-color: #333;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;

export const AdInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 8px;
  cursor: pointer;

  @media ${device.laptop} {
    justify-content: start;
  }
`;

export const AdImg = styled.img`
  width: 140px;
  height: 140px;

  @media ${device.laptop} {
    width: 200px;
    height: 200px;
  }

  @media ${device.laptopL} {
    width: 250px;
    height: 250px;
  }
`;

export const AdInfoBlock = styled.div``;

export const AdTitle = styled.p`
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 6px;
`;

export const AdPrice = styled.p`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 6px;
`;

const CustomText = styled.p`
  color: #737a8e;
  font-weight: 300;
  font-size: 12px;
  margin-bottom: 4px;
`;

export const AdPricePerArea = styled(CustomText)``;

export const AdAddress = styled(CustomText)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const AdDatePublished = styled(CustomText)`
  font-size: 10px;
`;
