import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetRequestAdsQuery } from '../../redux/services/request-ads/requestAdsApi';
import RequestAdsCardList from '../request-ads-card-list';

const UserRequestAdsList = () => {
  const { id } = useParams();

  const LIMIT: number = 10;

  const [page, setPage] = useState<string | number>(1);

  const getRequestAdsQuery = useGetRequestAdsQuery({
    limit: LIMIT,
    page: Number(page),
    userId: Number(id),
  });

  return <RequestAdsCardList {...getRequestAdsQuery} limit={LIMIT} page={page} setPage={setPage} />;
};

export default UserRequestAdsList;
