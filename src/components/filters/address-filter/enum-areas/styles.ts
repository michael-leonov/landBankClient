import styled from 'styled-components';

import { device } from '../../../../utils/consts';

export const EnumAreasBlock = styled.div`
  overflow-y: scroll;
  height: 94%;
  margin-bottom: 10px;

  @media ${device.tablet} {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-bottom: 20px;
  }

  @media ${device.laptop} {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-bottom: 30px;
  }
`;

export const Letter = styled.p`
  margin-bottom: 6px;
  font-weight: bold;
`;

export const EnumAreasWrapper = styled.div`
  /* overflow-y: scroll; */
  height: 94%;
  margin-bottom: 10px;
  font-weight: 300;
  display: flex;
  flex-direction: column;
  row-gap: 2px;
`;

export const RegionLabel = styled.label`
  display: flex;
  column-gap: 2px;
`;
