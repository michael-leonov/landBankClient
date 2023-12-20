import React from 'react';

import ErrorHandlingProps, { IError } from './interface';
import * as S from './styles';

const ErrorHandling = ({ error }: ErrorHandlingProps) => {
  if (error) {
    if ('status' in error) {
      const errMsg = 'error' in error ? error.error : (error as IError).data.message;

      return (
        <S.ErrorMessageWrapper>
          <div>Произошла ошибка:</div>
          <div>{errMsg}</div>
        </S.ErrorMessageWrapper>
      );
    } else {
      return <div>{error.message}</div>;
    }
  }

  return null;
};

export default ErrorHandling;
