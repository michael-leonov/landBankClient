import styled from 'styled-components';

import { device } from '../../utils/consts';

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;
  row-gap: 10px;

  @media ${device.tablet} {
    flex-direction: row;
    column-gap: 10px;
  }
`;

export const TitleBtnsWrapper = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

export const AdCardListWrapper = styled.div`
  margin-bottom: 10px;
`;

export const SwitchMethodBtnWrapper = styled.div``;
