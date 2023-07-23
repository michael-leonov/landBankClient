import React from 'react';
import AdProps from './interface';
import * as S from './styles';
import { getPriceWithSpaces } from '../../utils/getPriceWithSpaces';
import { useNavigate } from 'react-router-dom';
import { ADS_ROUTE } from '../../utils/consts';

const AdCard = ({ id, title, address, price, description, url, photos }: AdProps) => {
  // const getFoundedImage = (arrImgStrings: string[]): string => {
  //   const img = new Image();
  //   const BreakError = {};

  //   try {
  //     arrImgStrings.forEach((imgString: string) => {
  //       // img.onerror = () => {
  //       //   return;
  //       // };

  //       img.onload = () => {
  //         return (img.src = imgString);
  //       };
  //     });
  //   } catch (err) {
  //     if (err !== BreakError) throw err;
  //   }

  //   return img.src;
  // };

  const navigate = useNavigate();

  const goToAdPageOnClickHandler = (id: number): void => {
    navigate(`${ADS_ROUTE}/${id}`);
  };

  return (
    <S.CardWrapper onClick={() => goToAdPageOnClickHandler(id)}>
      <S.CardImg
        // src={getFoundedImage(photos)}
        src={photos[0]}
        alt={title}
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
