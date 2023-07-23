import styled from 'styled-components';
import { Link } from 'react-router-dom';
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

export const CardImg = styled.img`
  width: 100%;
  height: 41.25vw;
  border-radius: 6px 6px 0 0;

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
    width: 270px;
    height: 270px;
  }
`;

export const CardInfoTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: baseline;
  row-gap: 8px;
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
`;

export const CardDomain = styled(Link)`
  font-size: 16px;
  align-self: flex-end;
`;
