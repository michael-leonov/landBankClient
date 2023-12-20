import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useRemoveRequestAdMutation } from '../../../redux/services/request-ads/requestAdsApi';
import { REQUEST_ADS_ROUTE } from '../../../utils/consts';
import loadingTextBtn from '../../../utils/funcs/loadingTextBtn';
import CustomButton from '../../custom-button';

const RemoveRequestAdBtn = ({ id }: { id: number }) => {
  const [removeRequestAd, { isLoading }] = useRemoveRequestAdMutation();

  const navigate = useNavigate();

  const removeRequestAdHandler = async (): Promise<void> => {
    await removeRequestAd({ id })
      .unwrap()
      .then(() => {
        navigate(REQUEST_ADS_ROUTE);
      });
  };

  return (
    <CustomButton
      type='button'
      disabled={isLoading}
      variant='outlined'
      onClick={removeRequestAdHandler}
    >
      {isLoading ? loadingTextBtn : 'Удалить'}
    </CustomButton>
  );
};

export default RemoveRequestAdBtn;
