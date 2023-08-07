/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Link, To } from 'react-router-dom';

import { useAppSelector } from '../../redux/hooks';
import { selectUser } from '../../redux/slices/userSlice';
import { Role } from '../../redux/slices/userSlice/interface';
import { StyledContainer } from '../../styles/common-styled-components/styles';
import { userRoles } from '../../utils/consts';
import { getPriceWithSpaces } from '../../utils/getPriceWithSpaces';
import AdPhotosBlock from '../ad-photos-block';
import AdSliderPhotos from '../ad-slider-photos';
import AdsMap from '../ads-map';
import CustomButton from '../custom-button';
import AdDetailsProps from './interface';
import * as S from './styles';

const AdDetails = ({ ad }: AdDetailsProps) => {
  const [isShowMap, setIsShowMap] = useState<boolean>(false);
  const [activeImg, setActiveImg] = useState<number>(0);

  const { userInfo } = useAppSelector(selectUser);

  const isAdsEditor = userInfo?.roles.some(
    (role: Role): boolean => role.value === userRoles.adsEditor || role.value === userRoles.admin,
  );

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

            {/* {isAdsEditor && (
              <div style={{ display: 'flex' }}>
                <CustomButton type='button' disabled={false} variant='outlined'>
                  Проверено
                </CustomButton>
                <CustomButton type='button' disabled={false} variant='outlined'>
                  Добавить комментарий
                </CustomButton>
                <CustomButton type='button' disabled={false} variant='outlined'>
                  Редактировать объявление
                </CustomButton>
                <CustomButton type='button' disabled={false} variant='outlined'>
                  Удалить объявление
                </CustomButton>
              </div>
            )} */}
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
          <Link to={ad?.url as To} target='_blank'>
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
