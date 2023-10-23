import { fadeInRight } from 'react-animations';

import styled, { css, keyframes } from 'styled-components';

import { device } from '../../utils/consts';

export const AdDetailsBlock = styled.div``;

export const AdTitleAndPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ShortInfoBlock = styled.div`
  @media ${device.tablet} {
    display: flex;

    column-gap: 20px;
  }
`;

export const ShortInfoWrapper = styled.div``;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const Title = styled.p`
  font-weight: 500;
  font-size: 24px;

  @media ${device.desktop} {
    font-size: 40px;
  }
`;

const fadeInRightAnimation = keyframes`${fadeInRight}`;

export const AdCheckedIcon = styled.img<{ isChecked: boolean }>`
  width: 30px;
  height: 30px;

  ${({ isChecked }) =>
    isChecked &&
    css`
      animation: 1s ${fadeInRightAnimation};
    `}
`;

export const Price = styled.p`
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: 600;

  @media ${device.tablet} {
    font-size: 22px;
  }

  @media ${device.desktop} {
    font-size: 28px;
  }
`;

export const DatePublished = styled.p`
  font-size: 12px;
  margin-bottom: 8px;
  color: #5f5f5f;

  @media ${device.tablet} {
  }

  @media ${device.desktop} {
    font-size: 16px;
  }
`;

export const Adress = styled.p`
  font-size: 14px;
  margin-bottom: 10px;

  @media ${device.tablet} {
  }

  @media ${device.desktop} {
  }
`;

export const AdsEditorBtnsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px;
  margin-bottom: 10px;
  /* display: flex;
  flex-direction: column;
  row-gap: 10px;
  margin-bottom: 10px; */
  max-width: 420px;
`;

export const MobSliderWrapper = styled.div`
  margin-bottom: 10px;

  @media ${device.tablet} {
    display: none;
  }
`;

export const Description = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
  line-height: 1.4;
`;

export const SourceLinkWrapper = styled.div`
  margin-bottom: 10px;
  padding: 8px 10px;
  background-color: #fff;
  border: 1px solid #8e8e8e;
  width: min-content;
  border-radius: 6px;
  transition: background-color 0.3s ease-in;
  cursor: pointer;

  &:hover {
    background-color: ghostwhite;
  }
`;

export const BtnWrapper = styled.div`
  max-width: 180px;
  margin-bottom: 10px;
`;
