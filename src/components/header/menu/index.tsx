import React, { useState, useRef } from 'react';

import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import { Overlay } from '../../../styles/common-styled-components/styles';
import Logo from '../../logo';
import AuthLink from '../auth-link';
import Burger from '../burger';
import { pages } from '../nav-bar/options';
import * as S from './styles';

const Menu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const node = useRef<HTMLDivElement>(null);
  const close = (): void => setOpen(false);

  useOnClickOutside(node, () => setOpen(false));

  return (
    <>
      <div ref={node}>
        <S.Menu open={open}>
          <S.LogoWrapper onClick={() => close()}>
            <Logo />
          </S.LogoWrapper>

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
      {open && <Overlay />}
    </>
  );
};

export default Menu;
