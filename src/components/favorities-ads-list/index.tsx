import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';

import { useGetFavoritiesAdsQuery } from '../../redux/services/ads/adsApi';
import AdCardList from '../ad-card-list';
import * as S from './styles';

const FavoritiesAdsList = () => {
  const { id } = useParams();

  const [cookies] = useCookies(['token']);

  const { data, error, isError, isFetching, isLoading, isSuccess } = useGetFavoritiesAdsQuery({
    token: cookies.token,
    userId: Number(id),
  });

  const LIMIT: number = 10;

  const [page, setPage] = useState<string | number>(1);

  return (
    <S.PaddingWrapper>
      <AdCardList
        ads={data}
        isError={isError}
        isLoading={isLoading}
        isSuccess={isSuccess}
        isFetching={isFetching}
        error={error}
        limit={LIMIT}
        page={page}
        setPage={setPage}
      />
    </S.PaddingWrapper>
  );
};

export default FavoritiesAdsList;
