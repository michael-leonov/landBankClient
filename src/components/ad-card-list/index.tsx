/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useGetAdsQuery } from '../../redux/services/ads';
import AdCard from '../ad-card';
import AdProps from '../ad-card/interface';

const AdCardList = () => {
  const LIMIT: number = 30;
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isError, isSuccess } = useGetAdsQuery({ limit: LIMIT, page });

  if (isSuccess) {
    console.log(data);
  }

  return (
    <div>
      <h2>Ad card list</h2>
      {isSuccess && data?.listAnnouncement?.map((ad: AdProps) => <AdCard key={ad.id} {...ad} />)}
    </div>
  );
};

export default AdCardList;
