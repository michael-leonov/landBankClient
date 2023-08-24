import React, { useState, useEffect } from 'react';

import NotificationNullAds from '../../components/NotificationNullAds';
import AdCardList from '../../components/ad-card-list';
import AdsMap from '../../components/ads-map';
import AdsPages from '../../components/ads-pages';
import AvgSumByAdsProp from '../../components/avg-sum-by-ads-prop';
import CustomButton from '../../components/custom-button';
import Filters from '../../components/filters';
import Sorting from '../../components/sorting/intex';
import { useAppSelector } from '../../redux/hooks';
import { useGetAdsQuery } from '../../redux/services/ads/adsApi';
import { selectFilterAds } from '../../redux/slices/filtersAdsSlice';
import { StyledContainer, StyledSection } from '../../styles/common-styled-components/styles';
import * as S from './styles';

const Ads = () => {
  const LIMIT: number = 100;

  const [page, setPage] = useState<string | number>(1);
  const [isListMethod, setIsListMethod] = useState<boolean>(true);

  const filtersAds = useAppSelector(selectFilterAds);

  const { data, error, isError, isFetching, isLoading, isSuccess } = useGetAdsQuery({
    limit: isListMethod ? LIMIT : undefined,
    page: isListMethod ? page : undefined,
    ...filtersAds,
  });

  const curentCount = data?.listAnnouncement?.length;

  const isEmptyList = !isLoading && !curentCount;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <>
      <StyledSection>
        <StyledContainer>
          <S.TitleWrapper>
            <h1>Объявления</h1>
            <S.TitleBtnsWrapper>
              <Filters />
              <S.SwitchMethodBtnWrapper>
                <CustomButton
                  type='button'
                  onClick={() => setIsListMethod(!isListMethod)}
                  disabled={false}
                  variant='outlined'
                >
                  {isListMethod ? 'Показать на карте' : 'Показать списком'}
                </CustomButton>
              </S.SwitchMethodBtnWrapper>
            </S.TitleBtnsWrapper>
          </S.TitleWrapper>
          <Sorting />
        </StyledContainer>

        {isListMethod ? (
          <StyledContainer>
            <AvgSumByAdsProp
              currentTotal={curentCount}
              data={data}
              isSuccess={isSuccess}
              prop='price'
              propText='Средняя стоимость, показанная на странице'
              toFixed={0}
              unit='₽'
            />
            <AvgSumByAdsProp
              currentTotal={curentCount && 10000 * curentCount}
              data={data}
              isSuccess={isSuccess}
              prop='area'
              propText='Средняя площадь, показанная на странице'
              toFixed={2}
              unit='гектар'
            />

            {isEmptyList ? (
              <NotificationNullAds
                title='Поиск не дал результатов'
                description='Попробуйте изменить критерии поиска или продолжить поиск позже.'
              />
            ) : (
              <>
                <S.AdCardListWrapper>
                  <AdCardList
                    ads={data?.listAnnouncement}
                    isSuccess={isSuccess}
                    isLoading={isLoading}
                    isError={isError}
                    error={error}
                    isFetching={isFetching}
                  />
                </S.AdCardListWrapper>
                <AdsPages
                  limit={LIMIT}
                  totalCount={data?.totalCount as number}
                  pageState={page}
                  setPageState={setPage}
                  isLoading={isLoading}
                  isFetching={isFetching}
                />
              </>
            )}
          </StyledContainer>
        ) : (
          <AdsMap ads={data?.listAnnouncement} />
        )}
      </StyledSection>
    </>
  );
};

export default Ads;
