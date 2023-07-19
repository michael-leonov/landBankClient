import React, { useState } from 'react';
import AdCardList from '../../components/ad-card-list';
import { useGetAdsQuery } from '../../redux/services/ads';
import AdsPages from '../../components/ads-pages';
import AdsMap from '../../components/ads-map';

const Ads = () => {
  const LIMIT: number = 100;

  const [page, setPage] = useState<number>(1);
  const [isListMethod, setIsListMethod] = useState<boolean>(true);

  let getAdsQuery;

  if (isListMethod) {
    getAdsQuery = useGetAdsQuery({
      limit: LIMIT,
      page,
    });
  } else {
    getAdsQuery = useGetAdsQuery({
      limit: undefined,
      page: undefined,
    });
  }

  const { data, isLoading, isFetching, isError, isSuccess } = getAdsQuery;

  const reduceSumByAdsProp = (prop: string): number =>
    data?.listAnnouncement.reduce(
      (acc: number, curr: { [key: string]: number }) => acc + curr[prop],
      0,
    );

  let AdsAvgPrice = 0;
  let AdsAvgArea = 0;

  if (isSuccess) {
    console.log(data);
    AdsAvgPrice = reduceSumByAdsProp('price') / data?.listAnnouncement.length;
    AdsAvgArea = reduceSumByAdsProp('area') / 10000 / data?.listAnnouncement.length;
  }

  return (
    <div>
      <h1>Ads list page</h1>

      <button onClick={() => setIsListMethod(!isListMethod)}>
        {isListMethod ? 'На карте' : 'Списком'}
      </button>

      {isListMethod ? (
        <>
          <h3>Средняя стоимость: {AdsAvgPrice.toFixed(0)} ₽</h3>
          <h3>Средняя площадь: {AdsAvgArea.toFixed(2)} гектара</h3>
          <AdCardList
            ads={data?.listAnnouncement}
            isSuccess={isSuccess}
            isLoading={isLoading}
            isError={isError}
            isFetching={isFetching}
          />
          <AdsPages limit={LIMIT} totalCount={data?.totalCount} page={page} setPage={setPage} />
        </>
      ) : (
        <AdsMap ads={data?.listAnnouncement} />
      )}
    </div>
  );
};

export default Ads;
