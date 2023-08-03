import React from 'react';
import { useLocation } from 'react-router-dom';

import AuthForm from '../../components/auth-form';
import { StyledContainer, StyledSection } from '../../styles/common-styled-components/styles';
import { LOGIN_ROUTE } from '../../utils/consts';
import * as S from './styles';

const Auth = () => {
  const { pathname } = useLocation();

  const isLogin = pathname === LOGIN_ROUTE;

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
