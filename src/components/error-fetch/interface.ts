import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export interface IError {
  data: { statusCode: number; message: string };
  status: number;
}

interface ErrorFetchProps {
  error: FetchBaseQueryError | SerializedError | undefined;
}

export default ErrorFetchProps;
