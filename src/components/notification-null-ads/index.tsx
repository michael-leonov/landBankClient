import React from 'react';

import nullAds from '../../assets/NullAds.svg';
import NotificationNullAdsProps from './interface';
import { NullAdsImage, NullAdsTitle, NullAdsDescription, StyledNullAdsMain } from './styles';

const NotificationNullAds = ({ description, title }: NotificationNullAdsProps) => {
  return (
    <StyledNullAdsMain>
      <NullAdsImage>
        <img src={nullAds} alt='' />
      </NullAdsImage>
      <NullAdsTitle>{title}</NullAdsTitle>
      <NullAdsDescription>{description}</NullAdsDescription>
    </StyledNullAdsMain>
  );
};
export default NotificationNullAds;
