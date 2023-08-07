import React from 'react';

import UsersList from '../../components/admin-page-components/users-list';
import { useAppSelector } from '../../redux/hooks';
import { selectUser } from '../../redux/slices/userSlice';
import { Role } from '../../redux/slices/userSlice/interface';
import { StyledContainer, StyledSection } from '../../styles/common-styled-components/styles';
import { userRoles } from '../../utils/consts';

const Profile = () => {
  const { userInfo } = useAppSelector(selectUser);

  const isAdmin = userInfo?.roles.some((role: Role): boolean => role.value === userRoles.admin);

  if (isAdmin) {
    return (
      <StyledSection>
        <StyledContainer>
          <p>Admin Page {userInfo?.email}</p>
          <UsersList />
        </StyledContainer>
      </StyledSection>
    );
  }

  return (
    <StyledSection>
      <StyledContainer>User Page {userInfo?.email}</StyledContainer>
    </StyledSection>
  );
};

export default Profile;
