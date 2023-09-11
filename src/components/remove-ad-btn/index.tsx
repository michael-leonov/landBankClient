import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import { useRemoveAdMutation } from '../../redux/services/ads/adsApi';
import { ADS_ROUTE } from '../../utils/consts';
import loadingTextBtn from '../../utils/funcs/loadingTextBtn';
import CustomButton from '../custom-button';

const RemoveAdBtn = ({ announcementId }: { announcementId: number }) => {
  const [removeAd, { isLoading }] = useRemoveAdMutation();
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();

  const removeAdHandler = async (): Promise<void> => {
    await removeAd({ id: announcementId, token: cookies.token })
      .unwrap()
      .then(() => {
        navigate(ADS_ROUTE);
      });
  };

  return (
    <CustomButton type='button' disabled={isLoading} variant='outlined' onClick={removeAdHandler}>
      {isLoading ? loadingTextBtn : 'Удалить объявление'}
    </CustomButton>
  );
};

export default RemoveAdBtn;
