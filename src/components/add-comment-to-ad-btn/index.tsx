import React from 'react';

import CustomButton from '../custom-button';

const AddCommentToAdBtn = () => {
  return (
    <CustomButton type='button' disabled={false} variant='outlined'>
      Добавить комментарий
    </CustomButton>
  );
};

export default AddCommentToAdBtn;
