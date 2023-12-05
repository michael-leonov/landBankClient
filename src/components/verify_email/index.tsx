/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';

import successIcon from '../../assets/success-icon.png';
import { useVerifyEmailMutation } from '../../redux/services/auth/authApi';
import { isFetchBaseQueryError, isErrorWithMessage } from '../../redux/services/helpers';
import { useCheckStatusUserQuery } from '../../redux/services/users/usersApi';
import { LOGIN_ROUTE } from '../../utils/consts';
import * as S from './styles';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');

  if (!token) {
    return (
      <S.CentredTextIntoDiv>
        <div style={{ marginBottom: '20px' }}>Некорректная ссылка! Проверьте строку запроса!</div>
        <Link to={LOGIN_ROUTE}>Авторизоваться</Link>
      </S.CentredTextIntoDiv>
    );
  }

  const {
    data,
    isLoading: isLoadingCheckStatus,
    isSuccess: isSuccessCheckStatus,
  } = useCheckStatusUserQuery(token);

  const [verifyEmailError, setVerifyEmailError] = useState<string>('');

  const [
    verifyEmail,
    { isError: isErrorVerify, isLoading: isLoadingVerify, isSuccess: isSuccessVerify },
  ] = useVerifyEmailMutation();

  useEffect(() => {
    if (isSuccessCheckStatus && !data.isActiveStatus) {
      (async () => {
        try {
          await verifyEmail({ token })
            .unwrap()
            .catch((error) => {
              setVerifyEmailError(error.data.message);
            });
        } catch (err) {
          if (isFetchBaseQueryError(err)) {
            const errMsg = 'error' in err ? err.error : JSON.stringify(err.data);
            setVerifyEmailError(errMsg);
          } else if (isErrorWithMessage(err)) {
            setVerifyEmailError(err.message);
          }
        }
      })();
    }
  }, [isSuccessCheckStatus]);

  if (isSuccessCheckStatus && data.isActiveStatus) {
    return (
      <S.CentredTextIntoDiv>
        <p style={{ marginBottom: '10px' }}>Почта уже подтверждена!</p>
        <Link to={LOGIN_ROUTE}>Войти</Link>
      </S.CentredTextIntoDiv>
    );
  }

  if (isSuccessVerify) {
    return (
      <S.CentredTextIntoDiv>
        <img src={successIcon} />
        <p>E-mail успешно подтвержден!</p>
        <Link to={LOGIN_ROUTE}>Войти</Link>
      </S.CentredTextIntoDiv>
    );
  }

  return <div> {isErrorVerify && <p>{verifyEmailError}</p>}</div>;
};

export default VerifyEmail;
