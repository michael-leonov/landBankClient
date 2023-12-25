import { Link } from 'react-router-dom';

import styled from 'styled-components';

export const NotFoundBlock = styled.div`
  position: relative;
  height: 80vh;
`;

export const NotFoundWrapper = styled.div`
  line-height: 1.4;
  text-align: center;
  max-width: 767px;
  width: 100%;
  padding: 15px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const NotFoundTitleWrapper = styled.div`
  position: relative;
  height: 168px;

  @media only screen and (min-width: 480px) {
    height: 220px;
  }
`;

export const NotFoundTitle = styled.h1`
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-size: 142px;
  font-weight: 200;
  margin: 0;
  background: linear-gradient(130deg, #545454, #81e383);
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  text-transform: uppercase;

  @media only screen and (min-width: 480px) {
    font-size: 186px;
  }
`;

export const NotFoundSubtitle = styled.h2`
  font-size: 22px;
  font-weight: 200;
  text-transform: uppercase;
  margin-top: 0;
  margin-bottom: 25px;
  letter-spacing: 3px;

  @media only screen and (min-width: 480px) {
    font-size: 33px;
  }
`;

export const NotFoundDescription = styled.p`
  font-size: 16px;
  font-weight: 200;
  margin-top: 0;
  margin-bottom: 25px;
`;

export const ReturnHomeLink = styled(Link)`
  font-weight: 200;
  text-decoration: none;
  border-bottom: 1px dashed #545454;
  border-radius: 2px;
`;
