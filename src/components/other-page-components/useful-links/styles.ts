import styled from 'styled-components';

import { device } from '../../../utils/consts';

export const UsefulLinks = styled.ul`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  color: #545454;
  font-size: 14px;

  @media ${device.tablet} {
    font-size: 16px;
  }
`;

export const SubUsefulLinks = styled(UsefulLinks)`
  margin-top: 6px;
  margin-left: 8px;
`;
