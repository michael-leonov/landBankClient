import React from 'react';
import AdProps from './interface';
import * as S from './styles';
import { getPriceWithSpaces } from '../../utils/getPriceWithSpaces';
import { useNavigate } from 'react-router-dom';
import { ADS_ROUTE } from '../../utils/consts';
import noImageAvailable from '../../assets/no-image.png';

const AdCard = ({ id, title, address, price, description, url, photos }: AdProps) => {
  const navigate = useNavigate();

  const goToAdPageOnClickHandler = (id: number): void => {
    navigate(`${ADS_ROUTE}/${id}`);
  };

  const onErrorImageHandler = (currentTarget: EventTarget & HTMLImageElement): void => {
    currentTarget.onerror = null;
    currentTarget.src = noImageAvailable;
  };

  return (
    <S.CardWrapper onClick={() => goToAdPageOnClickHandler(id)}>
      <S.CardImg
        src={photos[0] || noImageAvailable}
        alt={title}
        onError={({ currentTarget }) => onErrorImageHandler(currentTarget)}
      />

      <S.CardInfo>
        {/* <S.CardInfoTitleWrapper> */}
        <S.CardTitle>{title}</S.CardTitle>
        {/* </S.CardInfoTitleWrapper> */}
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