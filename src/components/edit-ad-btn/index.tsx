import React from 'react';

import CustomButton from '../custom-button';

const EditAdBtn = () => {
  return (
    <CustomButton type='button' disabled={false} variant='outlined'>
      Редактировать объявление
    </CustomButton>
  );
};

export default EditAdBtn;
