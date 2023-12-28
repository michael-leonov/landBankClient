import styled from 'styled-components';

import { device } from '../../utils/consts';

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  @media ${device.tablet} {
    flex-direction: row;
    column-gap: 24px;
  }
`;

export const FormBlock = styled.div`
  @media ${device.tablet} {
    width: 55%;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 4px;
  margin-bottom: 10px;
`;

export const Description = styled.p`
  margin-bottom: 20px;
`;

export const ResultBlock = styled.div`
  margin: 0 auto;
  text-align: center;

  @media ${device.tablet} {
    padding-top: 150px;
  }
`;
