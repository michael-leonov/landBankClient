import React from 'react';

import CustomButton from '../custom-button';

const RemoveAdBtn = () => {
  return (
    <CustomButton type='button' disabled={false} variant='outlined'>
      Удалить объявление
    </CustomButton>
  );
};

export default RemoveAdBtn;
