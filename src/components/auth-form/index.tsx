/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../redux/hooks';
import { useLoginMutation, useSignupMutation } from '../../redux/services/auth/authApi';
import { isErrorWithMessage, isFetchBaseQueryError } from '../../redux/services/helpers';
import { setUser } from '../../redux/slices/userSlice';
import { SIGN_UP_ROUTE } from '../../utils/consts';
import CustomButton from '../custom-button';
import AuthFormProps from './interace';
import * as S from './styles';
import FormValues from './types';

const AuthForm = ({ isLogin }: AuthFormProps) => {
  const {
    formState: { errors, isSubmitting },
    getValues,
    handleSubmit,
    register,
    reset,
  } = useForm<FormValues>({ mode: 'all' });

  const emailPattern = /^[\w]{1}[\w-.]*@[\w-]+\.[a-z]{2,3}$/i;
  const emailReg = new RegExp(emailPattern);

  const [login, { error: loginError }] = useLoginMutation();
  const [signUp, { error: SignUpError }] = useSignupMutation();

  const [cookies, setCookie] = useCookies(['token']);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    data.email = data.email.toLowerCase();

    try {
      if (isLogin) {
        await login(data)
          .unwrap()
          .then((payload) => {
            const { token, user } = payload;

            const { password, ...rest } = user;

            setCookie('token', token);
            dispatch(setUser({ isAuth: true, token, userInfo: rest }));

            navigate('/');
          })
          .catch((error) => {
            console.error('rej', loginError);
            console.error('rejected', error);
          });
      } else {
        await signUp(data)
          .unwrap()
          .then((payload) => {
            const { token, user } = payload;

            const { password, ...rest } = user;

            setCookie('token', token);
            dispatch(setUser({ isAuth: true, token, userInfo: rest }));

            navigate('/');
          })
          .catch((error) => {
            console.error('rej', SignUpError);
            console.error('rejected', error);
          });
      }
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        // you can access all properties of `FetchBaseQueryError` here
        const errMsg = 'error' in err ? err.error : JSON.stringify(err.data);
        // enqueueSnackbar(errMsg, { variant: 'error' });

        console.log(errMsg);
      } else if (isErrorWithMessage(err)) {
        // you can access a string 'message' property here
        // enqueueSnackbar(err.message, { variant: 'error' });
        console.log(err.message);
      }
    }
  };

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.FormInputWrapper>
        <S.FormInput
          placeholder='Email'
          type='email'
          error={errors.email}
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
      <S.FormInputWrapper>
        <S.FormInput
          placeholder='Пароль'
          type='password'
          error={errors.password}
          {...register('password', { required: 'Введите пароль' })}
        />
        {errors.password && <S.ErrorSubmitText>{errors.password.message}</S.ErrorSubmitText>}
      </S.FormInputWrapper>

      {!isLogin && (
        <S.FormInputWrapper>
          <S.FormInput
            placeholder='Повторите пароль'
            type='password'
            error={errors.passwordRepeat}
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
      )}

      {isLogin ? (
        <S.LoginFormBtnsWrapper>
          <CustomButton type='submit' disabled={isSubmitting}>
            Войти
          </CustomButton>
          <Link to={SIGN_UP_ROUTE}>
            <CustomButton type='button' disabled={isSubmitting} variant='outlined'>
              Зарегистрироваться
            </CustomButton>
          </Link>
          {/* {loginError && <S.ErrorSubmitText>{loginError.data.message}</S.ErrorSubmitText>} */}
          {/* {loginError && (
              <div>
                {loginError.status} {JSON.stringify(loginError.data)}
              </div>
            )} */}
        </S.LoginFormBtnsWrapper>
      ) : (
        <div>
          <CustomButton type='submit' disabled={isSubmitting}>
            Зарегистрироваться
          </CustomButton>
          {/* {error && <S.ErrorSubmitText>Такой пользователь уже зарегистрирован</S.ErrorSubmitText>} */}
        </div>
      )}
    </S.Form>
  );
};

export default AuthForm;
