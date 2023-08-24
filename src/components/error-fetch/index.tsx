import React from 'react';

import { StyledContainer } from '../../styles/common-styled-components/styles';
import ErrorFetchProps from './interface';

const ErrorFetch = ({ error }: ErrorFetchProps) => {
  if (error) {
    if ('status' in error) {
      const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);

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
