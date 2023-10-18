/* eslint-disable camelcase */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Ad } from '../../redux/services/ads/interface';
import { ADS_ROUTE, myDomain } from '../../utils/consts';
import formateAdDate from '../../utils/funcs/formatAdDate';
import { getPriceWithSpaces } from '../../utils/funcs/getPriceWithSpaces';
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
  url,
}: Ad) => {
  const isBankZemel = domain === myDomain ? true : false;

  const navigate = useNavigate();

  const goToAdPageOnClickHandler = (id: number): void => {
    navigate(`${ADS_ROUTE}/${id}`);
  };

  if (!photos) {
    return null;
  }

  return (
    <S.CardWrapper onClick={() => goToAdPageOnClickHandler(id)}>
      <div>
        <AdCardSliderPhotos photos={photos} title={title} domain={domain} />
      </div>

      <S.CardInfo>
        <S.CardTitle>{title}</S.CardTitle>
        <S.CardAddress>{address}</S.CardAddress>
        <S.CardDatePublishedWrapper>
          {date_published && (
            // <S.CardDatePublished>Опубликовано: {date_published.slice(0, 10)}</S.CardDatePublished>
            <S.CardDatePublished>Опубликовано: {formateAdDate(date_published)}</S.CardDatePublished>
          )}
        </S.CardDatePublishedWrapper>

        <S.CardPrice>{getPriceWithSpaces(price.toString())} ₽</S.CardPrice>
        <S.CardDescription>{description || 'У объявления нет описания'}</S.CardDescription>
        {!isBankZemel && (
          <S.CardDomain to={url} target='_blank' onClick={(e) => e.stopPropagation()}>
            Источник
          </S.CardDomain>
        )}
      </S.CardInfo>
    </S.CardWrapper>
  );
};

export default AdCard;
