import React, { useState, useRef } from 'react';

import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { selectUser, logout } from '../../../redux/slices/userSlice';
import { Overlay } from '../../../styles/common-styled-components/styles';
import { sidebarMenuPages } from '../../../utils/consts';
import Logo from '../../logo';
import AuthLink from '../auth-link';
import Burger from '../burger';
import * as S from './styles';

const Menu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const node = useRef<HTMLDivElement>(null);
  const close = (): void => setOpen(false);

  const { isAuth } = useAppSelector(selectUser);

  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  useOnClickOutside(node, () => setOpen(false));

  return (
    <>
      <div ref={node}>
        <S.Menu open={open}>
          <S.LogoWrapper onClick={close}>
            <Logo />
          </S.LogoWrapper>

          <S.AuthBLock onClick={close}>
            <AuthLink />
            {isAuth && (
              <S.LogoutBtn type='button' onClick={logoutHandler}>
                Выйти
              </S.LogoutBtn>
            )}
          </S.AuthBLock>

          <S.MenuNav>
            {sidebarMenuPages.map((page, i) => (
              <S.MenuLink key={i} to={page.route} onClick={close}>
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
