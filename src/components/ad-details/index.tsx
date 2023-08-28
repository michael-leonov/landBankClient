import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, To } from 'react-router-dom';

import checkedAdIcon from '../../assets/checked-ad-icon.png';
import { useAppSelector } from '../../redux/hooks';
import { Ad } from '../../redux/services/ads/interface';
import { selectUser } from '../../redux/slices/userSlice';
import { Role } from '../../redux/slices/userSlice/interface';
import { StyledContainer } from '../../styles/common-styled-components/styles';
import { userRoles } from '../../utils/consts';
import { getPriceWithSpaces } from '../../utils/funcs/getPriceWithSpaces';
import AdPhotosBlock from '../ad-photos-block';
import AdSliderPhotos from '../ad-slider-photos';
import AddCommentToAdBtn from '../add-comment-to-ad-btn';
import AddToFavoritesBtn from '../add-to-favorites-btn';
import AdsMap from '../ads-map';
import CustomButton from '../custom-button';
import EditAdBtn from '../edit-ad-btn';
import RemoveAdBtn from '../remove-ad-btn';
import ToggleCheckedAdBtn from '../toggle-checked-ad-btn';
import AdDetailsProps from './interface';
import * as S from './styles';

const AdDetails = ({ ad }: AdDetailsProps) => {
  const [isShowMap, setIsShowMap] = useState<boolean>(false);
  const [activeImg, setActiveImg] = useState<number>(0);

  const { userInfo } = useAppSelector(selectUser);

  let isAdsEditor = false;

  if (userInfo) {
    isAdsEditor = userInfo.roles.some((role: Role): boolean => role.value !== userRoles.user);
  }

  const [cookies] = useCookies(['token']);

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
              <S.TitleWrapper>
                <S.Title>{ad?.title}</S.Title>
                {ad?.isChecked && (
                  <S.AdCheckedIcon
                    src={checkedAdIcon}
                    title='Проверено модератором'
                    isChecked={ad?.isChecked}
                  />
                )}
              </S.TitleWrapper>

              <S.Price>{getPriceWithSpaces(ad?.price.toString())} ₽</S.Price>
            </S.AdTitleAndPriceWrapper>
            {ad?.date_published && (
              <S.DatePublished>Опубликовано: {ad?.date_published}</S.DatePublished>
            )}

            <S.Adress>{ad?.address}</S.Adress>

            {isAdsEditor && (
              <S.AdsEditorBtnsWrapper>
                <ToggleCheckedAdBtn ad={ad} token={cookies?.token} />
                <AddCommentToAdBtn />
                <EditAdBtn />
                <RemoveAdBtn />
                <AddToFavoritesBtn />
              </S.AdsEditorBtnsWrapper>
            )}
          </S.ShortInfoWrapper>
        </S.ShortInfoBlock>
      </StyledContainer>

      <S.MobSliderWrapper>
        <AdSliderPhotos photos={ad?.photos || []} title={ad?.title} isSuccess={true} />
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
        {isShowMap && <AdsMap ads={[ad] as Ad[]} defaultLat={ad?.lat} defaultLon={ad?.lon} />}
      </StyledContainer>
    </S.AdDetailsBlock>
  );
};

export default AdDetails;
