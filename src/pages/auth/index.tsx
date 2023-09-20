import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AuthForm from '../../components/auth-form';
import { useAppSelector } from '../../redux/hooks';
import { selectUser } from '../../redux/slices/userSlice';
import { StyledContainer, StyledSection } from '../../styles/common-styled-components/styles';
import { LOGIN_ROUTE } from '../../utils/consts';
import * as S from './styles';

const Auth = () => {
  const { pathname } = useLocation();

  const isLogin = pathname === LOGIN_ROUTE;

  const { isAuth, userInfo } = useAppSelector(selectUser);

  const navigate = useNavigate();

  if (isAuth) {
    if (userInfo) {
      navigate(`/profile/${userInfo.id}`);
    }
  }

  return (
    <StyledSection>
      <StyledContainer>
        <S.AuthBlock>
          <S.AuthFormWrapper>
            <AuthForm isLogin={isLogin} />
          </S.AuthFormWrapper>
        </S.AuthBlock>
      </StyledContainer>
    </StyledSection>
  );
};

export default Auth;
