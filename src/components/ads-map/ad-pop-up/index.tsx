import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

import { useGetAdByIdQuery } from '../../../redux/services/ads/adsApi';
import { myDomain } from '../../../utils/consts';
import formateAdDate from '../../../utils/funcs/formatAdDate';
import { getPriceWithSpaces } from '../../../utils/funcs/getPriceWithSpaces';
import ErrorFetch from '../../error-fetch';
import AdPopUpProps from './interface';
import * as S from './styles';

const AdPopUp = ({ id, isVisiblePopUp, setIsVisiblePopUp }: AdPopUpProps) => {
  const onErrorImageHandler = (currentTarget: EventTarget & HTMLImageElement): void => {
    currentTarget.onerror = null;
    currentTarget.style.display = 'none';
  };

  const {
    data: ad,
    error,
    isError,
    isFetching,
    isLoading,
    isSuccess,
  } = useGetAdByIdQuery(id, { skip: !isVisiblePopUp });

  return (
    <S.PopUpAd isVisiblePopUp={isVisiblePopUp}>
      {isLoading || isFetching ? (
        <ThreeDots
          height='80'
          width='80'
          radius='9'
          color='#4fa94d'
          ariaLabel='three-dots-loading'
          visible={isLoading}
        />
      ) : isSuccess ? (
        <>
          <S.CloseBtn onClick={() => setIsVisiblePopUp(false)} />
          <Link to={`${id}`} target='_blank'>
            <S.AdInfoWrapper>
              {!!ad.photos && ad.photos[0] && (
                <S.AdImg
                  src={
                    ad.domain === myDomain
                      ? `${process.env.REACT_APP_API_URL}images/${ad.photos[0]}`
                      : ad.photos[0]
                  }
                  onError={({ currentTarget }) => onErrorImageHandler(currentTarget)}
                />
              )}
              <S.AdInfoBlock>
                <S.AdTitle>Участок {(ad.area / 10000).toFixed(2)} га</S.AdTitle>
                <S.AdPrice>{getPriceWithSpaces(ad.price.toString())} ₽</S.AdPrice>
                <S.AdPricePerArea>
                  {getPriceWithSpaces((ad.price / (ad.area / 10000)).toFixed().toString())} ₽ за
                  гектар
                </S.AdPricePerArea>
                <S.AdAddress>{ad.address}</S.AdAddress>
                {ad.date_published && (
                  <S.AdDatePublished>
                    Опубликовано: {formateAdDate(ad.date_published)}
                  </S.AdDatePublished>
                )}
              </S.AdInfoBlock>
            </S.AdInfoWrapper>
          </Link>
        </>
      ) : (
        isError && <ErrorFetch error={error} />
      )}
    </S.PopUpAd>
  );
};

export default AdPopUp;
