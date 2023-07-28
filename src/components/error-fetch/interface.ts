import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

interface ErrorFetchProps {
  error: FetchBaseQueryError | SerializedError | undefined;
}

export default ErrorFetchProps;
