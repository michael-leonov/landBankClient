import React, { useState, useEffect } from 'react';
import AdCardList from '../../components/ad-card-list';
import { useGetAdsQuery, useGetAdsForMapQuery } from '../../redux/services/ads';
import AdsPages from '../../components/ads-pages';
import AdsMap from '../../components/ads-map';
import { StyledContainer, StyledSection } from '../../styles/common-styled-components/styles';
import * as S from './styles';
import CustomButton from '../../components/custom-button';

const Ads = () => {
  const LIMIT: number = 10;

  const [page, setPage] = useState<string | number>(1);
  const [isListMethod, setIsListMethod] = useState<boolean>(true);

  let getAdsQuery;

  if (isListMethod) {
    getAdsQuery = useGetAdsQuery({
      limit: LIMIT,
      page,
    });
  } else {
    getAdsQuery = useGetAdsForMapQuery();
  }

  const { data, isLoading, isError, isSuccess, error } = getAdsQuery;

  const reduceSumByAdsProp = (prop: string): number =>
    data?.listAnnouncement.reduce(
      (acc: number, curr: { [key: string]: number }) => acc + curr[prop],
      0,
    );

  let AdsAvgPrice = 0;
  let AdsAvgArea = 0;

  if (isSuccess) {
    AdsAvgPrice = reduceSumByAdsProp('price') / data?.listAnnouncement.length;
    AdsAvgArea = reduceSumByAdsProp('area') / 10000 / data?.listAnnouncement.length;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <StyledSection>
      <StyledContainer>
        <S.TitleWrapper>
          <h1>Объявления</h1>
          <CustomButton
            type='button'
            onClick={() => setIsListMethod(!isListMethod)}
            disabled={false}
            variant='outlined'
          >
            {isListMethod ? 'Показать на карте' : 'Показать списком'}
          </CustomButton>
        </S.TitleWrapper>
      </StyledContainer>

      {isListMethod ? (
        <StyledContainer>
          <S.AvgTextByProp>
            Средняя стоимость: <b>{AdsAvgPrice.toFixed(0)} ₽</b>
          </S.AvgTextByProp>
          <S.AvgTextByProp>
            Средняя площадь: <b>{AdsAvgArea.toFixed(2)} гектара</b>
          </S.AvgTextByProp>
          <S.AdCardListWrapper>
            <AdCardList
              ads={data?.listAnnouncement}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isError={isError}
              error={error}
            />
          </S.AdCardListWrapper>

          <AdsPages
            limit={LIMIT}
            totalCount={data?.totalCount}
            pageState={page}
            setPageState={setPage}
          />
        </StyledContainer>
      ) : (
        <AdsMap ads={data?.listAnnouncement} />
      )}
    </StyledSection>
  );
};

export default Ads;
