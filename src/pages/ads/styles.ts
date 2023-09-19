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

export const SwitchMethodBtnWrapper = styled.div``;

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  @media ${device.tablet} {
    flex-direction: row;
    justify-content: space-between;
  }
`;
