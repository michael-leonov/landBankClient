/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  YMaps,
  Map,
  Placemark,
  FullscreenControl,
  ZoomControl,
  Clusterer,
} from '@pbe/react-yandex-maps';
import { useNavigate } from 'react-router-dom';
import { ADS_ROUTE } from '../../utils/consts';

// TODO: Оптимизация под переход с объявления/Отдельный компонент

const AdsMap = ({ ads }: any) => {
  const navigate = useNavigate();

  const goToAdPageOnClickHandler = (id: number): void => {
    navigate(`${ADS_ROUTE}/${id}`);
  };

  return (
    <YMaps>
      <Map
        defaultState={{
          center: [55.751574, 37.573856],
          zoom: 7,
        }}
        width={'100%'}
        height={'calc(100vh - 40px)'}
        modules={['geocode', 'geoObject.addon.balloon', 'geoObject.addon.hint']}
      >
        <Clusterer
          options={{
            groupByCoordinates: false,
          }}
        >
          {ads.map(
            (announcement: {
              id: number;
              lon: number;
              lat: number;
              title: string;
              photos: string[];
            }) => (
              <Placemark
                key={announcement.id}
                geometry={[announcement.lat, announcement.lon]}
                properties={{
                  hintContent:
                    `${announcement.title} ` +
                    `
                    <br /> ` +
                    `
                    <img src="${announcement?.photos[0]}" height="150" width="200">`,

                  // balloonContentHeader: announcement.title,
                  // balloonContentBody: `<img src="${announcement?.photos[0]}" height="150" width="200">`,
                  // balloonContentFooter: '123',
                }}
                options={{
                  iconColor: '#000000',
                  preset: 'islands#blackCircleDotIcon',
                }}
                onClick={() => goToAdPageOnClickHandler(announcement.id)}
              />
            ),
          )}
        </Clusterer>
        <FullscreenControl />
        <ZoomControl />
      </Map>
    </YMaps>
  );
};

export default AdsMap;
