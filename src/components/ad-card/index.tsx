/* eslint-disable camelcase */
import React from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../redux/hooks';
import { Ad } from '../../redux/services/ads/interface';
import { selectFilterAds } from '../../redux/slices/filtersAdsSlice';
import { selectUser } from '../../redux/slices/userSlice';
import { ADS_ROUTE, myDomain } from '../../utils/consts';
import formateAdDate from '../../utils/funcs/formatAdDate';
import { getPriceWithSpaces } from '../../utils/funcs/getPriceWithSpaces';
import priceByAreaUnitFilter from '../../utils/funcs/priceByAreaUnitFilter';
import AdCardSliderPhotos from './ad-card-slider-photos';
import * as S from './styles';

const AdCard = ({
  address,
  date_published,
  description,
  domain,
  id,
  photos,
  price,
  title,
  unit_price,
  url,
}: Ad) => {
  const isBankZemel = domain === myDomain ? true : false;

  const { areaUnit } = useAppSelector(selectFilterAds);

  const pricePerArea = priceByAreaUnitFilter(areaUnit, unit_price);

  const { isAuth } = useAppSelector(selectUser);

  if (!photos) {
    return null;
  }

  return (
    <S.CardWrapper>
      <div>
        <AdCardSliderPhotos photos={photos} title={title} domain={domain} />
      </div>
      <Link to={`${ADS_ROUTE}/${id}`} target='_blank'>
        <S.CardInfo>
          <S.CardTitle>{title}</S.CardTitle>
          <S.CardAddress>{address}</S.CardAddress>
          <S.CardDatePublishedWrapper>
            {date_published && (
              <S.CardDatePublished>
                Опубликовано: {formateAdDate(date_published)}
              </S.CardDatePublished>
            )}
          </S.CardDatePublishedWrapper>
          <S.CardPrice>{getPriceWithSpaces(price.toString())} ₽</S.CardPrice>
          <S.CardPricePerArea>{pricePerArea}</S.CardPricePerArea>
          <S.CardDescription>{description || 'У объявления нет описания'}</S.CardDescription>
          {!isBankZemel && isAuth && (
            <S.CardDomain to={url} target='_blank' onClick={(e) => e.stopPropagation()}>
              Источник
            </S.CardDomain>
          )}
        </S.CardInfo>
      </Link>
    </S.CardWrapper>
  );
};

export default AdCard;
