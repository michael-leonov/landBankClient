import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  YMaps,
  Map,
  Placemark,
  FullscreenControl,
  ZoomControl,
  Clusterer,
} from '@pbe/react-yandex-maps';

import { ADS_ROUTE, myDomain } from '../../utils/consts';
import AdsMapProps from './interface';

const AdsMap = ({ ads, defaultLat = 55.751574, defaultLon = 37.573856 }: AdsMapProps) => {
  const navigate = useNavigate();

  const goToAdPageOnClickHandler = (id: number): void => {
    navigate(`${ADS_ROUTE}/${id}`);
  };

  return (
    <YMaps>
      <Map
        defaultState={{
          center: [defaultLat, defaultLon],
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
          {ads?.map(
            (announcement: {
              id: number;
              lon: number;
              lat: number;
              title: string;
              photos: string[];
              domain: string;
            }) => (
              <Placemark
                key={announcement.id}
                geometry={[announcement.lat, announcement.lon]}
                properties={{
                  hintContent:
                    `${announcement.title}` +
                    `
                    <br /> ` +
                    `
                    ${
                      announcement.photos[0]
                        ? `<img src=${
                            announcement.domain === myDomain
                              ? process.env.REACT_APP_API_URL + announcement.photos[0]
                              : announcement.photos[0]
                          } height='150' width='200' />`
                        : ''
                    }
                 `,
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
