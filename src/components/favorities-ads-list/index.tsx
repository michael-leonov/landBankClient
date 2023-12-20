import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetFavoritiesAdsQuery } from '../../redux/services/ads/adsApi';
import { Ad } from '../../redux/services/ads/interface';
import AdCardList from '../ad-card-list';
import * as S from './styles';

const FavoritiesAdsList = () => {
  const { id } = useParams();

  const { data, error, isError, isFetching, isLoading, isSuccess } = useGetFavoritiesAdsQuery({
    userId: Number(id),
  });

  const LIMIT: number = 10;

  const [page, setPage] = useState<string | number>(1);

  return (
    <S.PaddingWrapper>
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

export default FavoritiesAdsList;
