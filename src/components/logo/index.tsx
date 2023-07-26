import React from 'react';

import logo from '../../assets/logo v3.svg';
import { HOME_ROUTE } from '../../utils/consts';
import * as S from './styles';

const Logo = () => {
  return (
    <S.LogoLink to={HOME_ROUTE}>
      <img src={logo} />
    </S.LogoLink>
  );
};

export default Logo;
