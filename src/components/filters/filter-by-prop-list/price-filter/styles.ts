import styled from 'styled-components';

import { device } from '../../../../utils/consts';

export const PriceInputsWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #b9c2c8;
  border-radius: 5px;
  overflow: hidden;
  background-color: white;

  @media ${device.laptop} {
    justify-content: space-between;
  }

  div {
    width: 30px;
    height: 1px;
    background: #979797;

    @media ${device.laptop} {
      width: 10px;
    }
  }
`;

export const PriceInput = styled.input`
  border: none;
  padding: 10px 10px;
  width: calc((100% - 30px) / 2);

  &:first-child {
    padding-right: 5px;
  }

  &:last-child {
    padding-left: 5px;
    text-align: right;
  }
`;
