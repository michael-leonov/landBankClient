import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../redux/hooks';
import { selectUser } from '../../redux/slices/userSlice';
import { StyledContainer, StyledSection } from '../../styles/common-styled-components/styles';
import * as S from './styles';

const Auth = () => {
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
            <Outlet />
          </S.AuthFormWrapper>
        </S.AuthBlock>
      </StyledContainer>
    </StyledSection>
  );
};

export default Auth;
