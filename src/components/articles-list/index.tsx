import React from 'react';
import ContentLoader from 'react-content-loader';

import { INews } from '../../redux/services/news/interface';
import { useGetNewsQuery } from '../../redux/services/news/newsApi';
import NotificationNullAds from '../NotificationNullAds';
import ArticleCard from '../article-card';
import ErrorFetch from '../error-fetch';
import * as S from './styles';

const ArticleList = ({ section }: { section: string | undefined }) => {
  const { data, error, isError, isFetching, isLoading, isSuccess } = useGetNewsQuery({
    section,
  });

  const isEmptyList = !isLoading && !data?.totalCount;

  if (isLoading || isFetching) {
    return (
      <S.SkeletonWrapper>
        {Array.from({ length: 8 }, (_v, k) => (
          <ContentLoader
            key={k}
            height='100%'
            width='100%'
            viewBox='0 0 320 170'
            speed={2}
            backgroundColor='#d8d5d5'
            foregroundColor='#ecebeb'
          >
            <rect x='0' y='0' rx='6' ry='6' width='30%' height='15' />
            <rect x='0' y='20' rx='6' ry='6' width='100%' height='45' />
            <rect x='0' y='70' rx='6' ry='6' width='100%' height='80' />
          </ContentLoader>
        ))}
      </S.SkeletonWrapper>
    );
  }

  if (isError) {
    return <ErrorFetch error={error} />;
  }

  return (
    <div>
      {isEmptyList ? (
        <NotificationNullAds
          title='Поиск не дал результатов'
          description='Попробуйте изменить критерии поиска или продолжить поиск позже.'
        />
      ) : (
        <S.ArticleList>
          {isSuccess && data.listNews.map((news: INews) => <ArticleCard key={news.id} {...news} />)}
        </S.ArticleList>
      )}
    </div>
  );
};

export default ArticleList;
