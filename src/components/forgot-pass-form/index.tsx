import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { useForgotPasswordMutation } from '../../redux/services/auth/authApi';
import { isFetchBaseQueryError, isErrorWithMessage } from '../../redux/services/helpers';
import { HOME_ROUTE } from '../../utils/consts';
import loadingTextBtn from '../../utils/funcs/loadingTextBtn';
import CustomButton from '../custom-button';
import * as S from './styles';
import FormValues from './types';

const ForgotPassForm = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({ mode: 'all' });

  const emailPattern = /^[\w]{1}[\w-.]*@[\w-]+\.[a-z]{2,3}$/i;
  const emailReg = new RegExp(emailPattern);

  const [forgotPassError, setForgotPassError] = useState<string>('');

  const [forgotPass, { isError, isLoading, isSuccess }] = useForgotPasswordMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    data.email = data.email.toLowerCase();

    try {
      await forgotPass(data.email)
        .unwrap()
        .catch((error) => {
          setForgotPassError(error.data.message);
        });
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const errMsg = 'error' in err ? err.error : JSON.stringify(err.data);
        setForgotPassError(errMsg);
      } else if (isErrorWithMessage(err)) {
        setForgotPassError(err.message);
      }
    }
  };

  if (isSuccess) {
    return (
      <div style={{ textAlign: 'center' }}>
        <S.SuccessTextResponse>
          На почту выслано письмо с инструкцией для сброса пароля
        </S.SuccessTextResponse>
        <Link to={HOME_ROUTE}>Вернуться на главную</Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <S.FormInputWrapper>
        <S.FormInput
          placeholder='E-mail'
          type='email'
          error={errors.email}
          isError={isError}
          {...register('email', {
            pattern: {
              message: 'Введите корректный e-mail',
              value: emailReg,
            },
            required: 'Введите e-mail',
          })}
        />
        {errors.email && <S.ErrorSubmitText>{errors.email.message}</S.ErrorSubmitText>}
      </S.FormInputWrapper>
      <div style={{ marginBottom: '10px' }}>
        <CustomButton disabled={isLoading} type='submit' onClick={() => setForgotPassError('')}>
          {isLoading ? loadingTextBtn : 'Сбросить пароль'}
        </CustomButton>
      </div>
      {isError && <S.ErrorSubmitText>{forgotPassError}</S.ErrorSubmitText>}
    </form>
  );
};

export default ForgotPassForm;
