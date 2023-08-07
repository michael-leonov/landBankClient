import React from 'react';
import { Link } from 'react-router-dom';

import loginIcon from '../../../assets/login.svg';
import { useAppSelector } from '../../../redux/hooks';
import { selectUser } from '../../../redux/slices/userSlice';
import { LOGIN_ROUTE, PROFILE_ROUTE } from '../../../utils/consts';
import * as S from './styles';

const AuthLink = () => {
  const { isAuth, userInfo } = useAppSelector(selectUser);

  return (
    <Link to={isAuth ? `${PROFILE_ROUTE}/${userInfo?.id}` : LOGIN_ROUTE}>
      <S.AuthTextWrapp>
        <S.AuthIcon src={loginIcon} />
        <S.AuthText>{isAuth ? 'Личный кабинет' : 'Войти или зарегистрироваться'}</S.AuthText>
      </S.AuthTextWrapp>
    </Link>
  );
};

export default AuthLink;
