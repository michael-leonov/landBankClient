import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, Navigate, useSearchParams } from 'react-router-dom';

import successIcon from '../../assets/success-icon.png';
import { useChangePasswordMutation } from '../../redux/services/auth/authApi';
import { isFetchBaseQueryError, isErrorWithMessage } from '../../redux/services/helpers';
import { FORGOT_PASS_ROUTE, LOGIN_ROUTE } from '../../utils/consts';
import loadingTextBtn from '../../utils/funcs/loadingTextBtn';
import CustomButton from '../custom-button';
import * as S from '../forgot-pass-form/styles';
import FormValues from './types';

const ResetPassForm = () => {
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
  } = useForm<FormValues>({ mode: 'all' });

  const [changePassError, setChangePassError] = useState<string>('');

  const [changePass, { isError, isLoading, isSuccess }] = useChangePasswordMutation();

  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');

  if (!token) {
    return <Navigate to={FORGOT_PASS_ROUTE} replace />;
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await changePass({ password: data.password, token })
        .unwrap()
        .catch((error) => {
          setChangePassError(error.data.message);
        });
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const errMsg = 'error' in err ? err.error : JSON.stringify(err.data);
        setChangePassError(errMsg);
      } else if (isErrorWithMessage(err)) {
        setChangePassError(err.message);
      }
    }
  };

  if (isSuccess) {
    return (
      <div style={{ textAlign: 'center' }}>
        <img src={successIcon} />
        <p>Пароль успешно изменен!</p>
        <Link to={LOGIN_ROUTE}>Войти</Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <S.FormInputWrapper>
        <S.FormInput
          placeholder='Пароль'
          type='password'
          error={errors.password}
          isError={isError}
          {...register('password', {
            minLength: {
              message: 'Пароль не должен быть меньше 8 символов',
              value: 8,
            },
            required: 'Введите пароль',
          })}
        />
        {errors.password && <S.ErrorSubmitText>{errors.password.message}</S.ErrorSubmitText>}
      </S.FormInputWrapper>
      <S.FormInputWrapper>
        <S.FormInput
          placeholder='Повторите пароль'
          type='password'
          error={errors.passwordRepeat}
          isError={isError}
          {...register('passwordRepeat', {
            required: 'Повторите пароль',
            validate: {
              matchesPreviousPassword: (value) => {
                const { password } = getValues();
                return password === value || 'Пароли не совпадают';
              },
            },
          })}
        />
        {errors.passwordRepeat && (
          <S.ErrorSubmitText>{errors.passwordRepeat.message}</S.ErrorSubmitText>
        )}
      </S.FormInputWrapper>
      <div style={{ marginBottom: '10px' }}>
        <CustomButton disabled={isLoading} type='submit' onClick={() => setChangePassError('')}>
          {isLoading ? loadingTextBtn : 'Сбросить пароль'}
        </CustomButton>
      </div>
      {isError && <S.ErrorSubmitText>{changePassError}</S.ErrorSubmitText>}
    </form>
  );
};

export default ResetPassForm;
