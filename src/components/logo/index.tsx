import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo v3.svg';
import { HOME_ROUTE } from '../../utils/consts';
import * as S from './styles';

const Logo = () => {
  return (
    <Link to={HOME_ROUTE}>
      <S.Logo src={logo} />
    </Link>
  );
};

export default Logo;
