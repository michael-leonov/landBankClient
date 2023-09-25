import styled from 'styled-components';

import { device } from '../../utils/consts';
import { Form, PlusIcon, PreviewAdvImageWrapper } from '../add-ad-form/styles';

export const EditForm = styled(Form)`
  padding: 24px 6px 6px;

  @media ${device.tablet} {
    padding: 30px 20px 20px;
  }
`;

export const EditPreviewAdvImageWrapper = styled(PreviewAdvImageWrapper)`
  width: 80px;
  height: 80px;

  @media ${device.tablet} {
    width: 100px;
    height: 100px;
  }
`;

export const EditPlusIcon = styled(PlusIcon)`
  width: 80px;
  height: 80px;

  @media ${device.tablet} {
    width: 100px;
    height: 100px;
  }
`;
