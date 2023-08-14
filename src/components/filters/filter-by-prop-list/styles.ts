import styled from 'styled-components';

import { device } from '../../../utils/consts';

export const FormSearchItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media ${device.laptop} {
    flex-direction: row;
    height: 100%;
  }
`;

export const PaddingWrapper = styled.div`
  padding: 0 20px 20px;

  @media ${device.laptop} {
    background-color: #fff;
    position: absolute;
    right: 0;
    top: 100%;
    width: 150%;
    padding: 10px 10px 20px;
  }
`;

export const PriceInputsWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #b9c2c8;
  border-radius: 5px;
  overflow: hidden;

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

export const SourceInputsBlock = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

export const SourceInputWrapper = styled.div`
  display: flex;
  column-gap: 10px;
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

export const SelectAreaUnit = styled.select`
  margin-bottom: 8px;
  padding: 4px 6px;
  width: 100%;
  border: 1px solid #b9c2c8;
  border-radius: 5px;
`;

export const AreaInputsWrapper = styled(PriceInputsWrapper)``;

export const AreaInput = styled(PriceInput)``;
