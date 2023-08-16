import React from 'react';
import { Link } from 'react-router-dom';

import HomeBlockLinkProps from './interface';
import * as S from './styles';

const HomeBlockLink = ({ children, imgUrl, route, title }: HomeBlockLinkProps) => {
  return (
    <Link to={route}>
      <S.Wrapper>
        <S.Img src={imgUrl} />
        <S.InfoWrapper>
          <h3>{title}</h3>
          {children}
        </S.InfoWrapper>
      </S.Wrapper>
    </Link>
  );
};

export default HomeBlockLink;
