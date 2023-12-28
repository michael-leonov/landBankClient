import styled from 'styled-components';

import { device } from '../../utils/consts';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  max-width: 320px;
  border: 1px solid #b9c2c8;
  border-radius: 8px;
  background-color: #fff;
  padding: 10px;
  box-shadow: 0px 5px 5px -5px rgba(34, 60, 80, 0.6);
  margin: 0 auto;
  position: relative;

  @media ${device.tablet} {
    margin: 0;
  }
`;

export const ElementFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
`;

export const Select = styled.select`
  padding: 4px 6px;
  border: 1px solid #b9c2c8;
  border-radius: 5px;
`;

export const Input = styled.input`
  padding: 4px 6px;
  border: 1px solid #b9c2c8;
  border-radius: 5px;
`;

export const ErrorInput = styled.p`
  color: lightcoral;
`;
