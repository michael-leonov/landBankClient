import React from 'react';
import { Link } from 'react-router-dom';
import { HOME_ROUTE } from '../../utils/consts';
import logo from '../../assets/logo v3.svg';
import * as S from './styles';

const Logo = () => {
  return (
    <Link to={HOME_ROUTE}>
      <S.Logo src={logo} />
    </Link>
  );
};

export default Logo;
