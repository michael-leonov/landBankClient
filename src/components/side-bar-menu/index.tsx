import React from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { reset, selectActiveBarLink, setActiveLink } from '../../redux/slices/activeBarLinkSlice';
import SideBarMenuProps from './interface';
import NavSlider from './nav-slider';
import * as S from './styles';

const SideBarMenu = ({ links }: SideBarMenuProps) => {
  const activeSideBarLink = useAppSelector(selectActiveBarLink);

  const dispatch = useAppDispatch();

  const onClickLinkHandler = (linkId: number) => {
    if (activeSideBarLink.activeId === linkId) {
      dispatch(reset());
    } else {
      dispatch(setActiveLink({ activeId: linkId }));
    }
  };

  return (
    <>
      <NavSlider
        links={links}
        onClickLinkHandler={onClickLinkHandler}
        activeSideBarLink={activeSideBarLink}
      />
      <S.SideNav>
        {links.map((link) => (
          <S.SideNavLink
            to={link.link}
            key={link.id}
            onClick={() => onClickLinkHandler(link.id)}
            active={activeSideBarLink.activeId === link.id}
          >
            {link.title}
          </S.SideNavLink>
        ))}
      </S.SideNav>
    </>
  );
};

export default SideBarMenu;
