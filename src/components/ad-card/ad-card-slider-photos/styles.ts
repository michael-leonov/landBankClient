import styled from 'styled-components';

import slideBtn from '../../../assets/arrow.svg';
import { device } from '../../../utils/consts';

export const AdCardSlideImgWrapper = styled.div`
  height: 41.25vw;
  border-radius: 6px 6px 0 0;
  background-color: #fff;

  @media ${device.tablet} {
    height: 27vw;
  }

  @media ${device.laptop} {
    height: 23vw;
  }

  @media ${device.laptopL} {
    height: 15vw;
  }

  @media ${device.desktop} {
    height: 270px;
  }
`;

export const AdSlideImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 6px 6px 0 0;
`;

const SwiperNavigationBtn = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 20%;

  &:after {
    content: '';
    width: 100%;
    height: 100%;
    background-image: url(${slideBtn});
    background-repeat: no-repeat;
    background-position: center;
  }
`;

export const SwiperNextBtn = styled(SwiperNavigationBtn)`
  right: 0;

  &:after {
    transform: rotate(180deg);
  }
`;

export const SwiperPrevBtn = styled(SwiperNavigationBtn)`
  left: 0;
`;

export const AdCardSlide = styled.div`
  &:hover,
  &:focus {
    ${SwiperNavigationBtn} {
      transition: background-color 0.2s ease-in-out;
      background-color: rgba(49, 49, 49, 0.3);

      &::after,
      &:focus {
        display: block;
      }
    }
  }
`;
