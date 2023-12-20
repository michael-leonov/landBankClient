import React from 'react';
import ContentLoader from 'react-content-loader';

import { Ad } from '../../redux/services/ads/interface';
import AdCard from '../ad-card';
import AdsPages from '../ads-pages';
import ErrorFetch from '../error-handling';
import NotificationNullAds from '../notification-null-ads';
import AdListProps from './interface';
import * as S from './styles';

const AdCardList = ({
  ads,
  error,
  isError,
  isFetching,
  isLoading,
  isSuccess,
  limit,
  page,
  setPage,
  totalCount,
}: AdListProps) => {
  const isEmptyList = !isLoading && !totalCount;

  if (isLoading || isFetching) {
    return (
      <S.SkeletonWrapper>
        {Array.from({ length: 8 }, (_v, k) => (
          <ContentLoader
            key={k}
            height='100%'
            width='100%'
            viewBox='0 0 320 500'
            speed={2}
            backgroundColor='#d8d5d5'
            foregroundColor='#ecebeb'
          >
            <rect x='0' y='0' rx='6' ry='6' width='100%' height='200' />
            <rect x='0' y='230' rx='6' ry='6' width='200' height='20' />
            <rect x='0' y='260' rx='6' ry='6' width='100%' height='50' />
            <rect x='0' y='320' rx='6' ry='6' width='180' height='20' />
            <rect x='0' y='350' rx='6' ry='6' width='100%' height='90' />
            <rect x='200' y='450' rx='6' ry='6' width='100' height='20' />
          </ContentLoader>
        ))}
      </S.SkeletonWrapper>
    );
  }

  if (isError) {
    return <ErrorFetch error={error} />;
  }

  return (
    <>
      {isEmptyList ? (
        <NotificationNullAds
          title='Поиск не дал результатов'
          description='Попробуйте изменить критерии поиска или продолжить поиск позже.'
        />
      ) : (
        <>
          <S.AdCardListWrapper>
            <S.CardsList>
              {isSuccess && ads?.map((ad: Ad) => <AdCard key={ad.id} {...ad} />)}
            </S.CardsList>
          </S.AdCardListWrapper>
          <AdsPages
            limit={limit}
            totalCount={totalCount}
            pageState={page}
            setPageState={setPage}
            isLoading={isLoading}
            isFetching={isFetching}
          />
        </>
      )}
    </>
  );
};

export default AdCardList;
