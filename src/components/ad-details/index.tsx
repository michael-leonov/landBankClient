import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { YMaps } from '@pbe/react-yandex-maps';

import checkedAdIcon from '../../assets/checked-ad-icon.png';
import { useAppSelector } from '../../redux/hooks';
import { IObjectManagerFeature } from '../../redux/services/ads/interface';
import { selectFilterAds } from '../../redux/slices/filtersAdsSlice';
import { selectUser } from '../../redux/slices/userSlice';
import { Role } from '../../redux/slices/userSlice/interface';
import { StyledContainer } from '../../styles/common-styled-components/styles';
import { myDomain, userRoles } from '../../utils/consts';
import { AnnouncementStatuses } from '../../utils/enums';
import formateAdDate from '../../utils/funcs/formatAdDate';
import { getPriceWithSpaces } from '../../utils/funcs/getPriceWithSpaces';
import priceByAreaUnitFilter from '../../utils/funcs/priceByAreaUnitFilter';
import AdMutationForm from '../ad-mutation-form';
import AdPhotosBlock from '../ad-photos-block';
import AdSliderPhotos from '../ad-slider-photos';
import AddNoteForm from '../add-note-form';
import AddToFavoritesBtn from '../add-to-favorites-btn';
import AdsMap from '../ads-map';
import CustomButton from '../custom-button';
import EditAdBtn from '../edit-ad-btn';
import NotesList from '../notes-list';
import OpenFormBtn from '../open-form-btn';
import RemoveAdBtn from '../remove-ad-btn';
import SetStatusAdBtn from '../set-status-ad-btn';
import ToggleCheckedAdBtn from '../toggle-checked-ad-btn';
import AdDetailsProps from './interface';
import * as S from './styles';

const AdDetails = ({ ad }: AdDetailsProps) => {
  const objectManagerFeature: IObjectManagerFeature = {
    geometry: {
      coordinates: [ad?.lat as number, ad?.lon as number],
      type: 'Point',
    },
    id: ad?.id as number,
    type: 'Feature',
  };

  const [isShowMap, setIsShowMap] = useState<boolean>(false);
  const [activeImg, setActiveImg] = useState<number>(0);

  const isBankZemel = ad?.domain === myDomain ? true : false;

  const { isAuth, userInfo } = useAppSelector(selectUser);

  const isMyAd = ad?.user?.id === userInfo?.id;

  const isAwaitStatus = ad?.status === AnnouncementStatuses.AWAIT;

  const isRejectedStatus = ad?.status === AnnouncementStatuses.REJECTED;

  const isInactiveStatus = ad?.status === AnnouncementStatuses.INACTIVE;

  const isAdsEditor = userInfo?.roles.some(
    (role: Role): boolean => role.value === userRoles.adsEditor,
  );

  const [isShowNotes, setIsShowNotes] = useState<boolean>(false);

  const { areaUnit } = useAppSelector(selectFilterAds);

  const pricePerArea = priceByAreaUnitFilter(areaUnit, Number(ad?.unit_price));

  if (!isAdsEditor && isAwaitStatus) {
    return <StyledContainer>Объявление на проверке</StyledContainer>;
  }

  if (!isAdsEditor && isRejectedStatus) {
    return (
      <StyledContainer>Объявление не прошло верификацию и не может быть отображено</StyledContainer>
    );
  }

  return (
    <>
      {isInactiveStatus && (
        <StyledContainer>
          <S.InActiveInfoWrapper>
            <div>Объявление снято с публикации</div>
            {isMyAd && (
              <SetStatusAdBtn
                idAnnouncement={ad.id}
                status={AnnouncementStatuses.ACTIVE}
                statusText='Восстановить объявление'
              />
            )}
          </S.InActiveInfoWrapper>
        </StyledContainer>
      )}

      {isRejectedStatus && <StyledContainer>Объявление отклонено модератором</StyledContainer>}

      {ad && (
        <>
          {isAdsEditor && isAwaitStatus && (
            <StyledContainer>
              <S.ModerationBtnsWrapper>
                <SetStatusAdBtn
                  statusText='Опубликовать'
                  idAnnouncement={ad.id}
                  status={AnnouncementStatuses.ACTIVE}
                />
                <SetStatusAdBtn
                  statusText='Отклонить'
                  idAnnouncement={ad.id}
                  status={AnnouncementStatuses.REJECTED}
                />
              </S.ModerationBtnsWrapper>
            </StyledContainer>
          )}
          <S.AdDetailsBlock>
            {(isInactiveStatus || isRejectedStatus) && <S.Overlay />}

            <StyledContainer>
              <S.ShortInfoBlock>
                <AdPhotosBlock
                  photos={ad.photos || []}
                  title={ad.title}
                  activeImg={activeImg}
                  setActiveImg={setActiveImg}
                  isBankZemel={isBankZemel}
                />
                <S.ShortInfoWrapper>
                  <S.AdTitleAndPriceWrapper>
                    <S.TitleWrapper>
                      <S.Title>{ad.title}</S.Title>
                      {ad.is_checked && (
                        <S.AdCheckedIcon
                          src={checkedAdIcon}
                          title='Проверено модератором'
                          isChecked={ad.is_checked}
                        />
                      )}
                    </S.TitleWrapper>
                    <S.Price>{getPriceWithSpaces(ad.price.toString())} ₽</S.Price>
                    <S.PricePerArea>{pricePerArea}</S.PricePerArea>
                  </S.AdTitleAndPriceWrapper>
                  {ad.date_published && (
                    <S.DatePublished>
                      Опубликовано: {formateAdDate(ad.date_published)}
                    </S.DatePublished>
                  )}
                  <S.Adress>{ad?.address}</S.Adress>
                  {!isBankZemel && isAuth && (
                    <S.SourceLinkWrapper>
                      <Link to={ad.url} target='_blank'>
                        Источник
                      </Link>
                    </S.SourceLinkWrapper>
                  )}
                  <S.AdsEditorBtnsWrapper>
                    {isAuth && !isInactiveStatus && !isRejectedStatus && (
                      <>
                        {isMyAd && !isAwaitStatus && (
                          <SetStatusAdBtn
                            statusText='Снять с публикации'
                            idAnnouncement={ad.id}
                            status={AnnouncementStatuses.INACTIVE}
                          />
                        )}

                        {!isAwaitStatus && !isInactiveStatus && <AddToFavoritesBtn />}
                        {isAdsEditor && !isAwaitStatus && (
                          <>
                            <ToggleCheckedAdBtn ad={ad} />
                            <OpenFormBtn
                              btnText='Добавить заметку'
                              formComponent={<AddNoteForm adId={ad?.id} />}
                            />
                            <EditAdBtn form={<AdMutationForm ad={ad} isEditStatusForm={true} />} />
                            <RemoveAdBtn announcementId={ad.id} />
                          </>
                        )}
                      </>
                    )}
                  </S.AdsEditorBtnsWrapper>
                </S.ShortInfoWrapper>
              </S.ShortInfoBlock>
            </StyledContainer>

            <S.MobSliderWrapper>
              <AdSliderPhotos
                photos={ad.photos || []}
                title={ad.title}
                isSuccess={true}
                isBankZemel={isBankZemel}
              />
            </S.MobSliderWrapper>

            <StyledContainer>
              <h2>Описание</h2>
              <S.Description>{ad.description}</S.Description>

              <S.BtnWrapper>
                <CustomButton
                  type='button'
                  onClick={() => setIsShowMap(!isShowMap)}
                  disabled={false}
                  variant='outlined'
                >
                  {isShowMap ? 'Скрыть карту' : 'Посмотреть на карте'}
                </CustomButton>
              </S.BtnWrapper>
              {isShowMap && (
                <YMaps query={{ lang: 'en_RU' }}>
                  <AdsMap
                    ads={[objectManagerFeature]}
                    defaultLat={ad?.lat}
                    defaultLon={ad?.lon}
                    setGeoBounds={() => {}}
                    isFetchingAds={false}
                  />
                </YMaps>
              )}
              {isAuth && !isInactiveStatus && !isAwaitStatus && !isRejectedStatus && (
                <S.BtnWrapper>
                  <CustomButton
                    type='button'
                    onClick={() => setIsShowNotes(!isShowNotes)}
                    disabled={false}
                    variant='outlined'
                  >
                    {isShowNotes ? 'Скрыть заметки' : 'Посмотреть заметки'}
                  </CustomButton>
                </S.BtnWrapper>
              )}

              {isShowNotes && <NotesList adId={ad?.id} />}
            </StyledContainer>
          </S.AdDetailsBlock>
        </>
      )}
    </>
  );
};

export default AdDetails;
