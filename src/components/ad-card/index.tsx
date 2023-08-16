import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ADS_ROUTE } from '../../utils/consts';
import { getPriceWithSpaces } from '../../utils/getPriceWithSpaces';
import AdCardSliderPhotos from './ad-card-slider-photos';
import AdProps from './interface';
import * as S from './styles';

const AdCard = ({ address, description, id, photos, price, title, url }: AdProps) => {
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
        <AdCardSliderPhotos photos={photos} title={title} />
      </div>

      <S.CardInfo>
        <S.CardTitle>{title}</S.CardTitle>
        <S.CardAddress>{address}</S.CardAddress>
        <S.CardPrice>{getPriceWithSpaces(price.toString())} ₽</S.CardPrice>
        <S.CardDescription>{description || 'У объявления нет описания'}</S.CardDescription>
        <S.CardDomain to={url} target='_blank' onClick={(e) => e.stopPropagation()}>
          Источник
        </S.CardDomain>
      </S.CardInfo>
    </S.CardWrapper>
  );
};

export default AdCard;
