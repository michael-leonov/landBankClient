import React from 'react';

import logoutIcon from '../../assets/exit.svg';
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
              <S.LogoutBtnWrapper onClick={logoutHandler}>
                <img src={logoutIcon} title='Выйти' width={16} height={16} />
                <S.LogoutBtn type='button'>Выйти</S.LogoutBtn>
              </S.LogoutBtnWrapper>
            )}
          </S.AuthLinkWrapper>
        </S.HeaderInner>
      </StyledContainer>
    </S.Header>
  );
};

export default Header;
