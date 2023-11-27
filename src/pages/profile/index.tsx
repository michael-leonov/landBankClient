import React from 'react';

import SideBarMenu from '../../components/side-bar-menu';
import { useAppSelector } from '../../redux/hooks';
import { selectActiveBarLink } from '../../redux/slices/activeBarLinkSlice';
import { selectUser } from '../../redux/slices/userSlice';
import { Role } from '../../redux/slices/userSlice/interface';
import { StyledSection } from '../../styles/common-styled-components/styles';
import { userRoles } from '../../utils/consts';
import { AdminLinks, AdsEditorLinks, UserLinks } from './options';
import * as S from './styles';

const Profile = () => {
  const { userInfo } = useAppSelector(selectUser);

  // todo Убрать `?` в `role?.value` после добавления ролей в приложение
  const isAdmin = userInfo?.roles.some((role: Role): boolean => role?.value === userRoles.admin);

  const isAdsEditor = userInfo?.roles.some(
    (role: Role): boolean => role?.value === userRoles.adsEditor,
  );

  const activeSideBarLink = useAppSelector(selectActiveBarLink);

  let activeContent: JSX.Element | undefined = UserLinks.find(
    (link) => link.id === activeSideBarLink.activeId,
  )?.content;

  if (isAdmin) {
    activeContent = AdminLinks.find((link) => link.id === activeSideBarLink.activeId)?.content;

    return (
      <StyledSection>
        <SideBarMenu links={AdminLinks} />
        <S.MarginWrapper>{activeContent || 'Не активный контент'}</S.MarginWrapper>
      </StyledSection>
    );
  }

  if (isAdsEditor) {
    activeContent = AdsEditorLinks.find((link) => link.id === activeSideBarLink.activeId)?.content;
    return (
      <StyledSection>
        <SideBarMenu links={AdsEditorLinks} />
        <S.MarginWrapper>{activeContent || 'Не активный контент'}</S.MarginWrapper>
      </StyledSection>
    );
  }

  return (
    <StyledSection>
      <SideBarMenu links={UserLinks} />
      <S.MarginWrapper>{activeContent || 'Не активный контент'}</S.MarginWrapper>
    </StyledSection>
  );
};

export default Profile;
