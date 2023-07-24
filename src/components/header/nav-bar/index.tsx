import React from 'react';
import { Link } from 'react-router-dom';

import { pages } from './options';
import * as S from './styles';

const NavBar = () => {
  return (
    <S.Nav>
      {pages.map((page, i) => (
        <Link key={i} to={page.route}>
          {page.title}
        </Link>
      ))}
    </S.Nav>
  );
};

export default NavBar;
