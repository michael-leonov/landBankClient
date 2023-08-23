import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../redux/hooks';
import { useLoginMutation, useSignupMutation } from '../../redux/services/auth/authApi';
import { AuthResponse } from '../../redux/services/auth/interface';
import { isErrorWithMessage, isFetchBaseQueryError } from '../../redux/services/helpers';
import { setUser } from '../../redux/slices/userSlice';
import { PROFILE_ROUTE, SIGN_UP_ROUTE } from '../../utils/consts';
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
  } = useForm<FormValues>({ mode: 'all' });

  const emailPattern = /^[\w]{1}[\w-.]*@[\w-]+\.[a-z]{2,3}$/i;
  const emailReg = new RegExp(emailPattern);

  const [authError, setAuthError] = useState<string>('');

  const [login, { isError: isLoginError }] = useLoginMutation();
  const [signUp, { isError: isSignUpError }] = useSignupMutation();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const setUserData = (payload: AuthResponse): void => {
    const { token, user } = payload;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;

    dispatch(setUser({ isAuth: true, token, userInfo: rest }));

    navigate(`${PROFILE_ROUTE}/${user.id}`);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    data.email = data.email.toLowerCase();

    try {
      if (isLogin) {
        await login(data)
          .unwrap()
          .then((payload) => {
            setUserData(payload);
          })
          .catch((error) => {
            setAuthError(error.data.message);
          });
      } else {
        await signUp(data)
          .unwrap()
          .then((payload) => {
            setUserData(payload);
          })
          .catch((error) => {
            setAuthError(error.data.message);
          });
      }
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const errMsg = 'error' in err ? err.error : JSON.stringify(err.data);
        setAuthError(errMsg);
      } else if (isErrorWithMessage(err)) {
        setAuthError(err.message);
      }
    }
  };

  return (
    <S.Form isAuthError={isLoginError || isSignUpError} onSubmit={handleSubmit(onSubmit)}>
      <S.FormInputWrapper>
        <S.FormInput
          placeholder='E-mail'
          type='email'
          error={errors.email}
          isAuthError={isLoginError || isSignUpError}
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
        {isLogin ? (
          <S.FormInput
            placeholder='Пароль'
            type='password'
            error={errors.password}
            isAuthError={isLoginError || isSignUpError}
            {...register('password', {
              required: 'Введите пароль',
            })}
          />
        ) : (
          <S.FormInput
            placeholder='Пароль'
            type='password'
            error={errors.password}
            isAuthError={isLoginError || isSignUpError}
            {...register('password', {
              minLength: {
                message: 'Пароль не должен быть меньше 8 символов',
                value: 8,
              },
              required: 'Введите пароль',
            })}
          />
        )}

        {errors.password && <S.ErrorSubmitText>{errors.password.message}</S.ErrorSubmitText>}
      </S.FormInputWrapper>

      {!isLogin && (
        <S.FormInputWrapper>
          <S.FormInput
            placeholder='Повторите пароль'
            type='password'
            error={errors.passwordRepeat}
            isAuthError={isLoginError || isSignUpError}
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
        <>
          <S.LoginFormBtnsWrapper>
            <CustomButton type='submit' disabled={isSubmitting}>
              Войти
            </CustomButton>
            <Link to={SIGN_UP_ROUTE}>
              <CustomButton type='button' disabled={isSubmitting} variant='outlined'>
                Зарегистрироваться
              </CustomButton>
            </Link>
          </S.LoginFormBtnsWrapper>
          {isLoginError && <S.ErrorSubmitText>{authError}</S.ErrorSubmitText>}
        </>
      ) : (
        <div>
          <CustomButton type='submit' disabled={isSubmitting}>
            Зарегистрироваться
          </CustomButton>
          {isSignUpError && <S.ErrorSubmitText>{authError}</S.ErrorSubmitText>}
        </div>
      )}
    </S.Form>
  );
};

export default AuthForm;
