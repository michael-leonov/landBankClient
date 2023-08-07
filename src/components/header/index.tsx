import React from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout, selectUser } from '../../redux/slices/userSlice';
import { StyledContainer } from '../../styles/common-styled-components/styles';
import Logo from '../logo';
import AuthLink from './auth-link';
import Menu from './menu';
import NavBar from './nav-bar';
import * as S from './styles';

const Header = () => {
  const { isAuth } = useAppSelector(selectUser);

  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <S.Header>
      <StyledContainer>
        <Menu />
        <S.HeaderInner>
          <Logo />
          <NavBar />
          <S.AuthLinkWrapper>
            <AuthLink />
            {isAuth && (
              <S.LogoutBtn type='button' onClick={logoutHandler}>
                Выйти
              </S.LogoutBtn>
            )}
          </S.AuthLinkWrapper>
        </S.HeaderInner>
      </StyledContainer>
    </S.Header>
  );
};

export default Header;
