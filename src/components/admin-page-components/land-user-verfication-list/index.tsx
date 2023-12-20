/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

import { isFetchBaseQueryError, isErrorWithMessage } from '../../../redux/services/helpers';
import { useAddRoleMutation, useGetUsersQuery } from '../../../redux/services/users/usersApi';
import CustomButton from '../../custom-button';
import ErrorFetch from '../../error-handling';
import SubmitingForm from '../../submiting-form';
import * as S from './styles';

const LandUserVerificationList = () => {
  const { data, error, isError, isLoading, isSuccess } = useGetUsersQuery({
    isLandUserObtainStatus: true,
  });

  const isEmptyList = !isLoading && !data?.listUsers.length;

  const [addRole, { isError: isAddRoleError, isLoading: isLoadingAddRole }] = useAddRoleMutation();

  const [addRoleError, setAddRoleError] = useState<string>('');

  const addRoleHandler = async (userId: number) => {
    try {
      await addRole(userId).unwrap();
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const errMsg = 'error' in err ? err.error : JSON.stringify(err.data);
        setAddRoleError(errMsg);
      } else if (isErrorWithMessage(err)) {
        setAddRoleError(err.message);
      }
    }
  };

  if (isLoading) {
    return <>Загрузка...</>;
  }

  if (isError) {
    return <ErrorFetch error={error} />;
  }

  return (
    <div>
      <p>Список пользователей</p>
      {isSuccess && isEmptyList ? (
        'Список пуст'
      ) : (
        <S.UserList>
          {data?.listUsers.map((user, i) => (
            <li key={user.id}>
              <S.User>
                <div style={{ columnGap: '4px', display: 'flex' }}>
                  <p>{i + 1}.</p>
                  <p>{user.email}</p>
                </div>
                <CustomButton
                  variant='outlined'
                  disabled={isLoadingAddRole}
                  onClick={() => addRoleHandler(user.id)}
                >
                  Выдать роль
                </CustomButton>
                <SubmitingForm loading={isLoadingAddRole} />
              </S.User>
              {isAddRoleError && <div>{addRoleError}</div>}
            </li>
          ))}
        </S.UserList>
      )}
    </div>
  );
};

export default LandUserVerificationList;
