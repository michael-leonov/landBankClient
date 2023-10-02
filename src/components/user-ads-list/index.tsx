import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../redux/hooks';
import { useGetAdsQuery } from '../../redux/services/ads/adsApi';
import { selectFilterAds } from '../../redux/slices/filtersAdsSlice';
import AdCardList from '../ad-card-list';
import * as S from '../favorities-ads-list/styles';

const UserAdsList = () => {
  const { id } = useParams();

  const filtersAds = useAppSelector(selectFilterAds);

  const LIMIT: number = 10;

  const [page, setPage] = useState<string | number>(1);

  const { data, error, isError, isFetching, isLoading, isSuccess } = useGetAdsQuery({
    limit: LIMIT,
    page,
    provideTag: 'Ads',
    ...filtersAds,
    userId: Number(id),
  });

  return (
    <S.PaddingWrapper>
      <AdCardList
        ads={isSuccess ? data.listAnnouncement : []}
        isError={isError}
        isLoading={isLoading}
        isSuccess={isSuccess}
        isFetching={isFetching}
        error={error}
        limit={LIMIT}
        page={page}
        setPage={setPage}
        totalCount={isSuccess ? data.totalCount : 0}
      />
    </S.PaddingWrapper>
  );
};

export default UserAdsList;
