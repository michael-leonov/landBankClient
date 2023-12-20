import React from 'react';

import { useSetStatusMutation } from '../../redux/services/ads/adsApi';
import loadingTextBtn from '../../utils/funcs/loadingTextBtn';
import CustomButton from '../custom-button';
import SetStatusAdBtnProps from './interface';

const SetStatusAdBtn = ({ idAnnouncement, status, statusText }: SetStatusAdBtnProps) => {
  const [setStatus, { isLoading }] = useSetStatusMutation();

  const setStatusHanlder = async (): Promise<void> => {
    await setStatus({ id: idAnnouncement, status }).unwrap();
  };

  return (
    <CustomButton type='button' disabled={isLoading} variant='outlined' onClick={setStatusHanlder}>
      {isLoading ? loadingTextBtn : statusText}
    </CustomButton>
  );
};

export default SetStatusAdBtn;
