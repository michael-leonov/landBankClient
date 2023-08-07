/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import { useGetUsersQuery } from '../../../redux/services/users/usersApi';

const UsersList = () => {
  const { data, error, isError, isLoading, isSuccess } = useGetUsersQuery();

  const isEmptyList = !isLoading && !data?.listUsers.length;

  if (isLoading) {
    return <>Loading...</>;
  }

  // if (isError) {
  //   return <>{JSON.stringify(error.data)}</>;
  // }

  if (isError) {
    return <>Что-то не так...</>;
  }

  return (
    <div>
      <p>Список пользователей</p>
      {isSuccess && isEmptyList
        ? 'Список пуст'
        : data?.listUsers.map((user, i) => (
            <div key={user.id}>
              <p>{user.email}</p>
              {user.roles.map((role) => (
                <div key={role.id} style={{ columnGap: '20px', display: 'flex' }}>
                  {/* <p>{role.id}</p> */}
                  <p>{role.description}</p>
                </div>
              ))}
            </div>
          ))}
    </div>
  );
};

export default UsersList;
