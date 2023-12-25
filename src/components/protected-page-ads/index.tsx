import React from 'react';
import { Link } from 'react-router-dom';

import lockImg from '../../assets/lock_v2.png';
import { StyledContainer } from '../../styles/common-styled-components/styles';
import { LOGIN_ROUTE } from '../../utils/consts';
import * as S from './styles';

const ProtectedPageAds = () => {
  return (
    <StyledContainer>
      <S.Block>
        <S.Wrapper>
          <img src={lockImg} width={120} style={{ marginBottom: '20px' }} />
          <p>
            <b>
              <Link to={LOGIN_ROUTE}>Авторизируйтесь</Link>
            </b>
            , чтобы получить доступ ко всем объявлениям и другому контенту.
          </p>
        </S.Wrapper>
      </S.Block>
    </StyledContainer>
  );
};

export default ProtectedPageAds;
