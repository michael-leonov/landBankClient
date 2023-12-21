import React from 'react';

import AdsPages from '../ads-pages';
import ErrorFetch from '../error-handling';
import NotificationNullAds from '../notification-null-ads';
import RequestAdCard from '../request-ad-card';
import RequestAdsCardListProps from './interface';
import * as S from './styles';

const RequestAdsCardList = ({
  data,
  error,
  isError,
  isFetching,
  isLoading,
  isSuccess,
  limit,
  page,
  setPage,
}: RequestAdsCardListProps) => {
  const isEmptyList = !isLoading && !data?.totalCount;

  if (isLoading) {
    <p>Загружаю список...</p>;
  }

  if (isError) {
    return <ErrorFetch error={error} />;
  }

  if (isSuccess) {
    return (
      <>
        {isEmptyList ? (
          <NotificationNullAds
            title='Поиск не дал результатов'
            description='Попробуйте изменить критерии поиска или продолжить поиск позже.'
          />
        ) : (
          <>
            <S.ListRequestAnnouncementWrapper>
              {data &&
                data.listRequestAnnouncement.map((ad) => <RequestAdCard key={ad.id} {...ad} />)}
            </S.ListRequestAnnouncementWrapper>
            <AdsPages
              limit={limit}
              totalCount={data?.totalCount || 0}
              pageState={page}
              setPageState={setPage}
              isLoading={isLoading}
              isFetching={isFetching}
            />
          </>
        )}
      </>
    );
  }

  return null;
};

export default RequestAdsCardList;
