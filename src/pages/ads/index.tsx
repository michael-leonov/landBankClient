import React, { useState, useEffect } from 'react';

import { YMaps } from '@pbe/react-yandex-maps';

import AdCardList from '../../components/ad-card-list';
import AdsMap from '../../components/ads-map';
// import AvgSumByAdsProp from '../../components/avg-sum-by-ads-prop';
import CustomButton from '../../components/custom-button';
import DownloadAdsXlsx from '../../components/download-ads-xlsx';
import Filters from '../../components/filters';
import Sorting from '../../components/sorting';
import { useDebounce } from '../../hooks/useDebounce';
import { usePosition } from '../../hooks/usePosition';
import { useAppSelector } from '../../redux/hooks';
import { useGetAdsQuery } from '../../redux/services/ads/adsApi';
import { Ad, IObjectManagerFeature } from '../../redux/services/ads/interface';
import { selectFilterAds } from '../../redux/slices/filtersAdsSlice';
import { selectUser } from '../../redux/slices/userSlice';
import { Role } from '../../redux/slices/userSlice/interface';
import { StyledContainer, StyledSection } from '../../styles/common-styled-components/styles';
import { userRoles } from '../../utils/consts';
import { AnnouncementStatuses } from '../../utils/enums';
import * as S from './styles';

const Ads = () => {
  const LIMIT: number = 100;

  const [page, setPage] = useState<string | number>(1);
  const [isListMethod, setIsListMethod] = useState<boolean>(true);
  const [geoBounds, setGeoBounds] = useState<string | undefined>(undefined);
  const debouncedGeoBounds = useDebounce(geoBounds, 1000);

  const filtersAds = useAppSelector(selectFilterAds);

  const { userInfo } = useAppSelector(selectUser);

  const isAdsEditor = userInfo?.roles.some(
    (role: Role): boolean => role?.value == (userRoles.adsEditor || userRoles.admin),
  );

  const { data, error, isError, isFetching, isLoading, isSuccess } = useGetAdsQuery(
    {
      geoBounds: isListMethod || filtersAds.address?.length ? undefined : debouncedGeoBounds,
      limit: isListMethod ? LIMIT : undefined,
      page: isListMethod ? page : undefined,
      provideTag: isListMethod ? 'Ads' : 'Ads_map',
      status: AnnouncementStatuses.ACTIVE,
      userId: undefined,
      ...filtersAds,
    },
    { skip: !isListMethod && !debouncedGeoBounds ? true : false },
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { error: geoError, latitude, longitude } = usePosition();

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
            <S.FlexWrapper>
              {/* <div>
                  <AvgSumByAdsProp
                    currentTotal={curentCount}
                    data={data?.listAnnouncement as Ad[]}
                    isSuccess={isSuccess}
                    prop='price'
                    propText='Средняя стоимость, показанная на странице'
                    toFixed={0}
                    unit='₽'
                  />
                  <AvgSumByAdsProp
                    currentTotal={curentCount && 10000 * curentCount}
                    data={data?.listAnnouncement as Ad[]}
                    isSuccess={isSuccess}
                    prop='area'
                    propText='Средняя площадь, показанная на странице'
                    toFixed={2}
                    unit='гектар'
                  />
                </div> */}
              {isAdsEditor && (
                <DownloadAdsXlsx
                  listAnnouncement={data?.listAnnouncement as Ad[]}
                  isSuccess={isSuccess}
                  isLoading={isLoading}
                  page={page}
                />
              )}
            </S.FlexWrapper>

            <AdCardList
              ads={isSuccess ? (data.listAnnouncement as Ad[]) : []}
              isSuccess={isSuccess}
              isLoading={isLoading}
              isError={isError}
              error={error}
              isFetching={isFetching}
              page={page}
              limit={LIMIT}
              setPage={setPage}
              totalCount={isSuccess ? data.totalCount : 0}
            />
          </StyledContainer>
        ) : (
          <YMaps query={{ lang: 'en_RU' }}>
            <AdsMap
              ads={isSuccess ? (data.listAnnouncement as unknown as IObjectManagerFeature[]) : []}
              setGeoBounds={setGeoBounds}
              isFetchingAds={isFetching}
              defaultLat={latitude}
              defaultLon={longitude}
            />
          </YMaps>
        )}
      </StyledSection>
    </>
  );
};

export default Ads;
