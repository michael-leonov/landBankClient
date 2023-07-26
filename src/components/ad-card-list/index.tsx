/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import AdCard from '../ad-card';
import AdProps from '../ad-card/interface';
import AdListProps from './interface';
import * as S from './styles';

const AdCardList = ({ ads, error, isError, isLoading, isSuccess }: AdListProps) => {
  if (isLoading) {
    return <p>Загружаю..</p>;
  }

  if (isError && error) {
    if ('status' in error) {
      const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);

      return (
        <div>
          <div>Произошла ошибка:</div>
          <div>{errMsg}</div>
        </div>
      );
    } else {
      return <div>{error.message}</div>;
    }
  }

  return (
    <S.CardsList>
      {isSuccess && ads?.map((ad: AdProps) => <AdCard key={ad.id} {...ad} />)}
    </S.CardsList>
  );
};

export default AdCardList;
