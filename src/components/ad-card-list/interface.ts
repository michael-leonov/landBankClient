import { Dispatch, SetStateAction } from 'react';

import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

import { Ad } from '../../redux/services/ads/interface';

interface AdListProps {
  ads?: Ad[];
  error?: FetchBaseQueryError | SerializedError;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  limit: number;
  page: string | number;
  setPage: Dispatch<SetStateAction<string | number>>;
  totalCount: number;
}

export default AdListProps;
