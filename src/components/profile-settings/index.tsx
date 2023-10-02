/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useForm } from 'react-hook-form';

import { useAppSelector } from '../../redux/hooks';
import { selectUser } from '../../redux/slices/userSlice';

const ProfileSettings = () => {
  const { userInfo } = useAppSelector(selectUser);

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      email: userInfo?.email,
    },
  });
  return (
    <div>
      Настройки профиля
      <form>
        <label>Email:</label>
        <input type='text' placeholder='Укажите имя' {...register('email')} />
      </form>
    </div>
  );
};

export default ProfileSettings;
