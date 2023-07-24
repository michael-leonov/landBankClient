/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

import { StyledContainer } from '../../styles/common-styled-components/styles';
import Logo from '../logo';
import AuthLink from './auth-link';
import Menu from './menu';
import NavBar from './nav-bar';
import * as S from './styles';

const Header = () => {
  return (
    <S.Header>
      <StyledContainer>
        <Menu />
        <S.HeaderInner>
          <Logo />
          <NavBar />
          <S.AuthLinkWrapper>
            <AuthLink />
          </S.AuthLinkWrapper>
        </S.HeaderInner>
      </StyledContainer>
    </S.Header>
  );
};

export default Header;
