import styled from 'styled-components';

import { device } from '../../../utils/consts';

export const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  background-color: #fff;
  padding: 4px 8px;
  flex: 1 1;
  margin-right: 6px;

  @media ${device.laptop} {
    border-right: 1px solid #f2f4f6;
    margin-right: 0;
  }
`;

export const SearchBarLabel = styled.label`
  font-size: 10px;
`;

export const SearchBarInput = styled.input`
  border: none;
  height: 100%;
  width: 100%;
`;
