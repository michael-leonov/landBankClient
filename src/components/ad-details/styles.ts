import styled from 'styled-components';

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

export const Title = styled.p`
  margin-bottom: 10px;
  font-weight: 500;
  font-size: 24px;

  @media ${device.desktop} {
    font-size: 40px;
  }
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
  margin-bottom: 6px;
`;

export const BtnWrapper = styled.div`
  max-width: 180px;
  margin-bottom: 10px;
`;

// export const Description = styled.p``;

// export const Description = styled.p``;
