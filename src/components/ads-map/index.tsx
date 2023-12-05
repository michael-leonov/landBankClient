/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';

import { YMaps, Map, FullscreenControl, ZoomControl, ObjectManager } from '@pbe/react-yandex-maps';
import yamps from 'yandex-maps';

import { useAppSelector } from '../../redux/hooks';
import { selectFilterAds } from '../../redux/slices/filtersAdsSlice';
import AdPopUp from './ad-pop-up';
import AdsMapProps from './interface';
import * as S from './styles';

const AdsMap = ({
  ads,
  defaultLat = 55.751574,
  defaultLon = 37.573856,
  isFetchingAds,
  setGeoBounds,
}: AdsMapProps) => {
  const [isVisiblePopUp, setIsVisiblePopUp] = useState<boolean>(false);
  const [adId, setAdId] = useState<number>();

  const { address } = useAppSelector(selectFilterAds);

  const isEmptyAddress = address?.length ? false : true;

  const isEmptyAds = ads.length ? false : true;

  const map = useRef<any>(null);
  const ymaps = useRef<any>(null);

  const onClickPlacemarkHandler = (id: number) => {
    setIsVisiblePopUp(true);
    setAdId(id);
  };

  const handleBoundsChange = () =>
    setGeoBounds(encodeURIComponent(map.current.getBounds().join(',')));

  const onLoadMap = (ymapsInstance: typeof yamps) => {
    ymaps.current = ymapsInstance;
    const geoBoundsEncode = encodeURIComponent(map.current.getBounds().join(','));
    setGeoBounds(geoBoundsEncode);
  };

  useEffect(() => {
    if (!isEmptyAddress && !isEmptyAds) {
      const startLat = ads[0].geometry.coordinates[0];
      const startLon = ads[0].geometry.coordinates[1];

      if (map.current) {
        map.current.setCenter([startLat, startLon]);
      }
    }
  }, [isFetchingAds]);

  return (
    <S.YmapsWrapper>
      <YMaps>
        <Map
          instanceRef={map}
          onLoad={onLoadMap}
          defaultState={{
            center: [defaultLat, defaultLon],
            zoom: 7,
          }}
          width={'100%'}
          height={'70vh'}
          modules={['geocode']}
          onBoundsChange={handleBoundsChange}
        >
          {ads.length && !isFetchingAds ? (
            <ObjectManager
              instanceRef={(ref: any) => {
                if (ref) {
                  if (ref.objects) {
                    ref.objects.events.add('click', (e: any) => {
                      const objectId = e.get('objectId');
                      onClickPlacemarkHandler(objectId);
                    });
                  }
                }
              }}
              options={{
                clusterize: true,
                gridSize: 180,
              }}
              features={ads}
              objects={{
                openBalloonOnClick: true,
                preset: 'islands#greenDotIcon',
              }}
              clusters={{
                preset: 'islands#redClusterIcons',
              }}
            />
          ) : null}
          <FullscreenControl />
          <ZoomControl />
        </Map>
      </YMaps>
      {isFetchingAds && (
        <S.OverlayLoaderWrapper>
          <S.LoaderWrapper>
            <MagnifyingGlass
              visible={isFetchingAds}
              height='150'
              width='150'
              ariaLabel='MagnifyingGlass-loading'
              wrapperClass='MagnifyingGlass-wrapper'
              glassColor='#c0efff'
              color='#a5dcad'
            />
          </S.LoaderWrapper>
        </S.OverlayLoaderWrapper>
      )}

      <AdPopUp id={adId} isVisiblePopUp={isVisiblePopUp} setIsVisiblePopUp={setIsVisiblePopUp} />
    </S.YmapsWrapper>
  );
};

export default AdsMap;
