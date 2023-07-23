import React from 'react';

import { EffectFade, Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import AdSliderPhotosProps from './interface';
import * as S from './styles';
import { css } from 'aphrodite';

const AdSliderPhotos = ({ photos, isSuccess, title }: AdSliderPhotosProps) => {
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
        bulletClass: css(S.BulletStyles.styles),
        bulletActiveClass: css(S.BulletStyles.active),
        renderBullet: (_index, className) => `<span class="${className}"></span>`,
      }}
    >
      {isSuccess &&
        photos.map((photo) => (
          <SwiperSlide key={photo}>
            <S.AdSlideImgWrapper>
              <S.AdSlideImg src={photo} alt={title} />
            </S.AdSlideImgWrapper>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default AdSliderPhotos;
