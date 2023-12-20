import React from 'react';

import LinkMailtoProps from './interface';
import * as S from './styles';

const LinkMailto = ({ label, mailto }: LinkMailtoProps) => {
  return (
    <S.MailLink
      to='#'
      onClick={(e) => {
        window.location.href = `mailto:${mailto}`;
        e.preventDefault();
      }}
    >
      {label}
    </S.MailLink>
  );
};

export default LinkMailto;
