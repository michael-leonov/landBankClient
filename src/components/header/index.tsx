/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import * as S from './styles';
import { StyledContainer } from '../../styles/common-styled-components/styles';
import NavBar from './nav-bar';
import Menu from './menu';
import Logo from '../logo';
import AuthLink from './auth-link';

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
