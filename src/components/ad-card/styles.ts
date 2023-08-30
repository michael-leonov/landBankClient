import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { device } from '../../utils/consts';

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 4px 4px;
  transition: box-shadow 0.3s ease-in-out 0s;
  border-radius: 6px;
  padding-bottom: 10px;
  cursor: pointer;
`;

export const CardInfo = styled.div`
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

export const CardTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const CardAddress = styled.p`
  color: #737a8e;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 47px;

  @media ${device.tablet} {
    height: 55px;
  }

  @media ${device.desktop} {
    height: 63px;
  }
`;

export const CardDatePublishedWrapper = styled.div`
  height: 32px;

  @media ${device.tablet} {
    height: 19px;
  }
`;

export const CardDatePublished = styled.p`
  color: #737a8e;
`;

export const CardPrice = styled.p`
  font-size: 16px;
  font-weight: 600;
`;

export const CardDescription = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #737a8e;
  height: 78px;

  @media ${device.tablet} {
    height: 91px;
  }

  @media ${device.desktop} {
    height: 104px;
  }
`;

export const CardDomain = styled(Link)`
  font-size: 12px;
  align-self: flex-end;
`;
