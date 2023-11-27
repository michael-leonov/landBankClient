/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';

import {
  YMaps,
  Map,
  Placemark,
  FullscreenControl,
  ZoomControl,
  Clusterer,
} from '@pbe/react-yandex-maps';

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

  const onClickPlacemarkHandler = (id: number) => {
    document.body.style.overflow = 'hidden';
    setIsVisiblePopUp(true);
    setAdId(id);
  };

  // const onClickClustersHandler = (e: any) => {
  //   e.preventDefault();
  //   // const target = e.originalEvent.currentTarget;
  //   // console.log(e.originalEvent.currentTarget);
  //   console.log(e);
  // };

  const map = useRef<any>(null);
  const ymaps = useRef<any>(null);
  const clusters = useRef<any>(null);

  // const changeIconCluster = (e: { get: (arg0: string) => any }) => {
  //   const target = e.get('target'),
  //     type = e.get('type');
  //   if (typeof target.getGeoObjects != 'undefined') {
  //     // An event occurred on the cluster.
  //     if (type == 'mouseenter') {
  //       target.options.set('preset', 'islands#invertedPinkClusterIcons');
  //     } else {
  //       target.options.set('preset', 'islands#invertedVioletClusterIcons');
  //     }
  //   } else {
  //     // An event took place on the geo object.
  //     if (type == 'mouseenter') {
  //       target.options.set('preset', 'islands#pinkIcon');
  //     } else {
  //       target.options.set('preset', 'islands#violetIcon');
  //     }
  //   }
  // };

  const handleBoundsChange = () =>
    setGeoBounds(encodeURIComponent(map.current.getBounds().join(',')));

  return (
    <S.YmapsWrapper>
      <YMaps>
        <Map
          instanceRef={map}
          onLoad={(ymapsInstance) => {
            ymaps.current = ymapsInstance;
            const geoBoundsEncode = encodeURIComponent(map.current.getBounds().join(','));
            setGeoBounds(geoBoundsEncode);
          }}
          defaultState={{
            center: [defaultLat, defaultLon],
            zoom: 7,
          }}
          width={'100%'}
          height={'80vh'}
          modules={[
            'geocode',
            'geoObject.addon.balloon',
            'geoObject.addon.hint',
            // 'clusterer.addon.balloon',
          ]}
          onBoundsChange={handleBoundsChange}
        >
          <Clusterer
            // options={{ clusterDisableClickZoom: true }}
            instanceRef={clusters}
            // onClick={onClickClustersHandler}
            // onMouseEnter={changeIconCluster}
            // onMouseLeave={changeIconCluster}
            // onBalloonOpen={(e: any) => {
            //   console.log(e.get('cluster').getGeoObjects());
            // }}
          >
            {ads?.map(
              (announcement: { id: number; lon: number; lat: number; area: number }) =>
                announcement && (
                  <Placemark
                    key={announcement.id}
                    geometry={[announcement.lat, announcement.lon]}
                    options={{
                      iconColor: '#000000',
                      preset: 'islands#blackCircleDotIcon',
                    }}
                    // properties={{
                    //   clusterCaption: `метка ${announcement.id}`,
                    // }}
                    onClick={() => onClickPlacemarkHandler(announcement.id)}
                  />
                ),
            )}
          </Clusterer>
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
