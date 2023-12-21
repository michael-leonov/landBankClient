import React from 'react';

import SideBarMenu from '../../components/side-bar-menu';
import { useAppSelector } from '../../redux/hooks';
import { selectActiveBarLink } from '../../redux/slices/activeBarLinkSlice';
import { selectUser } from '../../redux/slices/userSlice';
import { Role } from '../../redux/slices/userSlice/interface';
import { StyledSection } from '../../styles/common-styled-components/styles';
import { userRoles } from '../../utils/consts';
import { adminLinks, adsEditorLinks, landUserLinks, userLinks } from './options';
import * as S from './styles';

const Profile = () => {
  const { userInfo } = useAppSelector(selectUser);

  // todo Убрать `?` в `role?.value` после добавления ролей в приложение
  const isAdmin = userInfo?.roles.some((role: Role): boolean => role?.value === userRoles.admin);

  const isAdsEditor = userInfo?.roles.some(
    (role: Role): boolean => role?.value === userRoles.adsEditor,
  );

  const isLandUser = userInfo?.roles.some(
    (role: Role): boolean => role?.value === userRoles.landUser,
  );

  const activeSideBarLink = useAppSelector(selectActiveBarLink);

  const noActiveContent = 'Неактивный контент';

  let activeContent: JSX.Element | undefined = userLinks.find(
    (link) => link.id === activeSideBarLink.activeId,
  )?.content;

  if (isAdmin) {
    activeContent = adminLinks.find((link) => link.id === activeSideBarLink.activeId)?.content;

    return (
      <StyledSection>
        <SideBarMenu links={adminLinks} />
        <S.MarginWrapper>{activeContent || noActiveContent}</S.MarginWrapper>
      </StyledSection>
    );
  }

  if (isAdsEditor) {
    activeContent = adsEditorLinks.find((link) => link.id === activeSideBarLink.activeId)?.content;

    return (
      <StyledSection>
        <SideBarMenu links={adsEditorLinks} />
        <S.MarginWrapper>{activeContent || noActiveContent}</S.MarginWrapper>
      </StyledSection>
    );
  }

  if (isLandUser) {
    activeContent = landUserLinks.find((link) => link.id === activeSideBarLink.activeId)?.content;

    return (
      <StyledSection>
        <SideBarMenu links={landUserLinks} />
        <S.MarginWrapper>{activeContent || noActiveContent}</S.MarginWrapper>
      </StyledSection>
    );
  }

  return (
    <StyledSection>
      <SideBarMenu links={userLinks} />
      <S.MarginWrapper>
        {activeContent ? (
          activeContent
        ) : userInfo?.isLandUserObtainStatus ? (
          <div>Администратор проводит Вашу модерацию</div>
        ) : (
          noActiveContent
        )}
      </S.MarginWrapper>
    </StyledSection>
  );
};

export default Profile;
