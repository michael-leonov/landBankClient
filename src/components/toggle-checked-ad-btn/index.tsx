import React from 'react';

import { useToggleCheckedMutation } from '../../redux/services/ads/adsApi';
import loadingTextBtn from '../../utils/funcs/loadingTextBtn';
import CustomButton from '../custom-button';
import ToggleCheckedAdBtnProps from './interface';

const ToggleCheckedAdBtn = ({ ad, token }: ToggleCheckedAdBtnProps) => {
  const [toggleChecked, { isLoading }] = useToggleCheckedMutation();

  const toggleCheckedHandler = async (): Promise<void> => {
    if (ad) {
      await toggleChecked({ id: ad.id, isChecked: !ad.isChecked, token }).unwrap();
    }
  };
  return (
    <CustomButton
      type='button'
      disabled={isLoading}
      variant='outlined'
      onClick={toggleCheckedHandler}
    >
      {isLoading ? loadingTextBtn : ad?.isChecked ? 'Не проверено' : 'Проверено'}
    </CustomButton>
  );
};

export default ToggleCheckedAdBtn;
