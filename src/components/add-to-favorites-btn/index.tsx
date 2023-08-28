import React from 'react';

import CustomButton from '../custom-button';

const AddToFavoritesBtn = () => {
  return (
    <CustomButton type='button' disabled={false} variant='outlined'>
      Добавить в избранное
    </CustomButton>
  );
};

export default AddToFavoritesBtn;
