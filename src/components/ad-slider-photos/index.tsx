import React, { useState } from 'react';

import { css } from 'aphrodite';
import { EffectFade, Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import noImageAvailable from '../../assets/no-image.png';
import AdSliderPhotosProps from './interface';
import * as S from './styles';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const AdSliderPhotos = ({ isSuccess, photos, title }: AdSliderPhotosProps) => {
  const [isErrorImageLoad, setIsErrorImageLoad] = useState<boolean>(false);

  const onErrorImageHandler = (currentTarget: EventTarget & HTMLImageElement): void => {
    currentTarget.onerror = null;
    setIsErrorImageLoad(true);
  };

  if (!photos?.length) {
    return (
      <S.AdSlideImgWrapper>
        <S.AdSlideImg src={noImageAvailable} />
      </S.AdSlideImgWrapper>
    );
  }

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop
      effect='fade'
      modules={[EffectFade, Autoplay, Pagination]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
        // eslint-disable-next-line perfectionist/sort-objects
        bulletClass: css(S.BulletStyles.styles),
        // eslint-disable-next-line perfectionist/sort-objects
        bulletActiveClass: css(S.BulletStyles.active),
        renderBullet: (_index, className) => `<span class="${className}"></span>`,
      }}
    >
      {isSuccess && isErrorImageLoad ? (
        <S.AdSlideImgWrapper>
          <S.AdSlideImg src={noImageAvailable} />
        </S.AdSlideImgWrapper>
      ) : (
        photos?.map((photo) => (
          <SwiperSlide key={photo}>
            <S.AdSlideImgWrapper>
              <S.AdSlideImg
                src={photo}
                alt={title}
                onError={({ currentTarget }) => onErrorImageHandler(currentTarget)}
              />
            </S.AdSlideImgWrapper>
          </SwiperSlide>
        ))
      )}
    </Swiper>
  );
};

export default AdSliderPhotos;
