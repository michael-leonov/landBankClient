import React, { useState } from 'react';

import { useAppSelector } from '../../redux/hooks';
import { useGetAdsQuery } from '../../redux/services/ads/adsApi';
import { selectFilterAds } from '../../redux/slices/filtersAdsSlice';
import { AnnouncementStatuses } from '../../utils/enums';
import AdCardList from '../ad-card-list';
import SelectStatusAds from '../select-status-ads';

const AdsVerificationList = () => {
  const filtersAds = useAppSelector(selectFilterAds);

  const LIMIT: number = 10;

  const [page, setPage] = useState<string | number>(1);
  const [status, setStatus] = useState<string>(AnnouncementStatuses.AWAIT);

  const { data, error, isError, isFetching, isLoading, isSuccess } = useGetAdsQuery({
    limit: LIMIT,
    page,
    provideTag: 'Ads',
    status,
    ...filtersAds,
  });

  return (
    <div>
      <SelectStatusAds status={status} setStatus={setStatus} />
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
    </div>
  );
};

export default AdsVerificationList;
