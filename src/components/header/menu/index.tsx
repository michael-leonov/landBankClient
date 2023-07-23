import React, { useState, useRef } from 'react';
import Burger from '../burger';
import * as S from './styles';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import Logo from '../../logo';
import { pages } from '../nav-bar/options';
import AuthLink from '../auth-link';

const Menu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const node = useRef<HTMLDivElement>(null);
  const close = () => setOpen(false);

  useOnClickOutside(node, () => setOpen(false));

  return (
    <div ref={node}>
      <S.Menu open={open}>
        <Logo />
        <AuthLink />
        <S.MenuNav>
          {pages.map((page, i) => (
            <S.MenuLink key={i} to={page.route} onClick={() => close()}>
              {page.title}
            </S.MenuLink>
          ))}
        </S.MenuNav>
      </S.Menu>
      <Burger open={open} setOpen={setOpen} />
    </div>
  );
};

export default Menu;
