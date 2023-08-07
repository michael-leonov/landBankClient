import React from 'react';

import ErrorFetchProps from './interface';

const ErrorFetch = ({ error }: ErrorFetchProps) => {
  if (error) {
    if ('status' in error) {
      const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);

      return (
        <div>
          <div>Произошла ошибка:</div>
          <div>{errMsg}</div>
        </div>
      );
    } else {
      return <div>{error.message}</div>;
    }
  }

  return <></>;
};

export default ErrorFetch;
