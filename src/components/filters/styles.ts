import styled from 'styled-components';

import { device } from '../../utils/consts';

export const SearchBlock = styled.div`
  display: flex;
`;

export const FilterListWrapper = styled.div`
  display: none;

  @media ${device.laptop} {
    display: block;
  }
`;

export const MobSearchBtnWrapper = styled.div`
  display: flex;

  @media ${device.laptopL} {
    display: none;
  }
`;

export const SearchBtnWrapper = styled.div`
  display: none;

  @media ${device.laptopL} {
    display: flex;
    margin-left: 10px;
    width: 100px;
  }
`;
