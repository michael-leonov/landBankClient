import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export interface IError {
  data: { statusCode: number; message: string };
  status: number;
}

interface ErrorHandlingProps {
  error: FetchBaseQueryError | SerializedError | undefined;
}

export default ErrorHandlingProps;
