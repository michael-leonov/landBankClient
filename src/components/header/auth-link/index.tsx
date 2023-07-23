import React from 'react';
import { Link } from 'react-router-dom';
import * as S from './styles';
import loginIcon from '../../../assets/login.svg';
import { LOGIN_ROUTE } from '../../../utils/consts';

const AuthLink = () => {
  return (
    <Link to={LOGIN_ROUTE}>
      <S.AuthTextWrapp>
        <S.AuthIcon src={loginIcon} />
        <S.AuthText>Войти или зарегистрироваться</S.AuthText>
      </S.AuthTextWrapp>
    </Link>
  );
};

export default AuthLink;
