import React from 'react';

import HomeBlockInfoProps from './interface';
import * as S from './styles';

const HomeBlockInfo = ({ children, imgUrl, title }: HomeBlockInfoProps) => {
  return (
    <S.Wrapper>
      <S.Img src={imgUrl} />
      <S.InfoWrapper>
        <h3>{title}</h3>
        {children}
      </S.InfoWrapper>
    </S.Wrapper>
  );
};

export default HomeBlockInfo;
