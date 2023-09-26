import styled from 'styled-components';

import { device } from '../../../utils/consts';

export const AddressFilterWrapper = styled.div`
  background-color: #fff;
  column-gap: 10px;
  position: fixed;
  top: 40%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  padding: 10px;
  width: 90%;
  height: 70vh;
  max-height: 400px;

  @media ${device.laptop} {
    max-width: 1000px;
    max-height: 600px;
  }

  @media ${device.laptopL} {
    height: 60vh;
  }
`;

export const AddressSearchBtnWrapper = styled.div`
  max-width: 320px;
  margin: auto;
  margin-bottom: 10px;
`;
