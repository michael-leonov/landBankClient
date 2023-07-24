/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import AdCard from '../ad-card';
import AdProps from '../ad-card/interface';
import * as S from './styles';

const AdCardList = ({ ads, error, isError, isLoading, isSuccess }: any) => {
  const isEmptyList = !isLoading && !ads?.length;

  if (isLoading) {
    return <p>Загружаю..</p>;
  }

  if (isError) {
    return <p>Ошибка: {error.message}</p>;
  }

  return (
    <>
      {isEmptyList ? (
        <p>Объявления отсутствуют</p>
      ) : (
        <S.CardsList>
          {isSuccess && ads.map((ad: AdProps) => <AdCard key={ad.id} {...ad} />)}
        </S.CardsList>
      )}
    </>
  );
};

export default AdCardList;
