import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../redux/hooks';
import { useGetAdsQuery } from '../../redux/services/ads/adsApi';
import { Ad } from '../../redux/services/ads/interface';
import { selectFilterAds } from '../../redux/slices/filtersAdsSlice';
import { AnnouncementStatuses } from '../../utils/enums';
import AdCardList from '../ad-card-list';
import * as S from '../favorities-ads-list/styles';
import SelectStatusAds from '../select-status-ads';

const UserAdsList = () => {
  const { id } = useParams();

  const filtersAds = useAppSelector(selectFilterAds);

  const LIMIT: number = 10;

  const [page, setPage] = useState<string | number>(1);
  const [status, setStatus] = useState<string>(AnnouncementStatuses.ACTIVE);

  const { data, error, isError, isFetching, isLoading, isSuccess } = useGetAdsQuery({
    limit: LIMIT,
    page,
    provideTag: 'Ads',
    ...filtersAds,
    status,
    userId: Number(id),
  });

  return (
    <S.PaddingWrapper>
      <SelectStatusAds status={status} setStatus={setStatus} />
      <AdCardList
        ads={isSuccess ? (data.listAnnouncement as Ad[]) : []}
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
