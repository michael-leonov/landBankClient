/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { StyledContainer } from '../../styles/common-styled-components/styles';
import { getPriceWithSpaces } from '../../utils/getPriceWithSpaces';
import AdPhotosBlock from '../ad-photos-block';
import AdSliderPhotos from '../ad-slider-photos';
import AdsMap from '../ads-map';
import CustomButton from '../custom-button';
import * as S from './styles';

const AdDetails = ({ ad }: any) => {
  const [isShowMap, setIsShowMap] = useState<boolean>(false);
  const [activeImg, setActiveImg] = useState<number>(0);

  return (
    <S.AdDetailsBlock>
      <StyledContainer>
        <S.ShortInfoBlock>
          <AdPhotosBlock
            photos={ad?.photos || []}
            title={ad?.title}
            activeImg={activeImg}
            setActiveImg={setActiveImg}
          />
          <S.ShortInfoWrapper>
            <S.AdTitleAndPriceWrapper>
              <S.Title>{ad?.title}</S.Title>
              <S.Price>{getPriceWithSpaces(ad?.price.toString())} ₽</S.Price>
            </S.AdTitleAndPriceWrapper>
            {ad?.date_published && (
              <S.DatePublished>Опубликовано: {ad?.date_published}</S.DatePublished>
            )}

            <S.Adress>{ad?.address}</S.Adress>
          </S.ShortInfoWrapper>
        </S.ShortInfoBlock>
      </StyledContainer>

      <S.MobSliderWrapper>
        <AdSliderPhotos photos={ad?.photos} title={ad?.title} isSuccess={true} />
      </S.MobSliderWrapper>

      <StyledContainer>
        <h2>Описание</h2>
        <S.Description>{ad?.description}</S.Description>
        <S.SourceLinkWrapper>
          <Link to={ad?.url} target='_blank'>
            Источник
          </Link>
        </S.SourceLinkWrapper>

        <S.BtnWrapper>
          <CustomButton
            type='button'
            onClick={() => setIsShowMap(!isShowMap)}
            disabled={false}
            variant='outlined'
          >
            {isShowMap ? 'Скрыть' : 'Посмотреть на карте'}
          </CustomButton>
        </S.BtnWrapper>
        {isShowMap && <AdsMap ads={[ad]} defaultLat={ad?.lat} defaultLon={ad?.lon} />}
      </StyledContainer>
    </S.AdDetailsBlock>
  );
};

export default AdDetails;
