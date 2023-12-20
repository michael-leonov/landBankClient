import { Dispatch, SetStateAction } from 'react';

import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

import { IGetRequestAdsResponse } from '../../redux/services/request-ads/interface';

interface RequestAdsCardListProps {
  data?: IGetRequestAdsResponse;
  error?: FetchBaseQueryError | SerializedError;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  limit: number;
  page: number | string;
  setPage: Dispatch<SetStateAction<string | number>>;
}
export default RequestAdsCardListProps;
