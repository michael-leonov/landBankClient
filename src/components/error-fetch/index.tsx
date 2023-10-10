import React from 'react';

import { StyledContainer } from '../../styles/common-styled-components/styles';
import ErrorFetchProps, { IError } from './interface';

const ErrorFetch = ({ error }: ErrorFetchProps) => {
  if (error) {
    if ('status' in error) {
      const errMsg = 'error' in error ? error.error : (error as IError).data.message;
      return (
        <StyledContainer>
          <div>Произошла ошибка:</div>
          <div>{errMsg}</div>
        </StyledContainer>
      );
    } else {
      return <div>{error.message}</div>;
    }
  }

  return <></>;
};

export default ErrorFetch;
