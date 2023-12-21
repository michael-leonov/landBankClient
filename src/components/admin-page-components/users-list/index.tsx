import React from 'react';

import { useGetUsersQuery } from '../../../redux/services/users/usersApi';
import ErrorFetch from '../../error-handling';

const UsersList = () => {
  const { data, error, isError, isLoading, isSuccess } = useGetUsersQuery({
    isLandUserObtainStatus: undefined,
  });

  const isEmptyList = !isLoading && !data?.listUsers.length;

  if (isLoading) {
    return <>Загрузка...</>;
  }

  if (isError) {
    return <ErrorFetch error={error} />;
  }

  return (
    <div>
      <p>Список пользователей</p>
      {isSuccess && isEmptyList
        ? 'Список пуст'
        : data?.listUsers.map((user) => (
            <div key={user.id}>
              <p>{user.email}</p>
              {user.roles.map((role) => (
                <div key={role.id} style={{ columnGap: '20px', display: 'flex' }}>
                  <p>{role.description}</p>
                </div>
              ))}
            </div>
          ))}
    </div>
  );
};

export default UsersList;
