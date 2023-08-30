import React, { useRef, useState } from 'react';

import { Swiper as SwiperType, Autoplay, EffectFade, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import noImageAvailable from '../../../assets/no-image.png';
import AdCardSliderPhotosProps from './interface';
import * as S from './styles';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

const AdCardSliderPhotos = ({ photos, title }: AdCardSliderPhotosProps) => {
  const [isErrorImageLoad, setIsErrorImageLoad] = useState<boolean>(false);

  const onErrorImageHandler = (currentTarget: EventTarget & HTMLImageElement): void => {
    currentTarget.onerror = null;
    setIsErrorImageLoad(true);
  };

  const swiperRef = useRef<SwiperType>();

  const nextSlideHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    swiperRef.current?.slideNext();
  };

  const prevSlideHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    swiperRef.current?.slidePrev();
  };

  if (!photos.length) {
    return (
      <S.AdCardSlideImgWrapper>
        <S.AdSlideImg src={noImageAvailable} />
      </S.AdCardSlideImgWrapper>
    );
  }

  return (
    <Swiper
      slidesPerView={1}
      loop
      effect='fade'
      modules={[EffectFade, Autoplay, Navigation]}
      onBeforeInit={(swiper) => {
        swiperRef.current = swiper;
      }}
    >
      {isErrorImageLoad ? (
        <S.AdCardSlideImgWrapper>
          <S.AdSlideImg src={noImageAvailable} />
        </S.AdCardSlideImgWrapper>
      ) : (
        photos.map((photo) => (
          <SwiperSlide key={photo}>
            <S.AdCardSlide>
              <S.AdCardSlideImgWrapper>
                <S.AdSlideImg
                  src={photo}
                  alt={title}
                  onError={({ currentTarget }) => onErrorImageHandler(currentTarget)}
                />
              </S.AdCardSlideImgWrapper>
              {photos.length > 1 && (
                <>
                  <S.SwiperNextBtn onClick={(e) => nextSlideHandler(e)} />
                  <S.SwiperPrevBtn onClick={(e) => prevSlideHandler(e)} />
                </>
              )}
            </S.AdCardSlide>
          </SwiperSlide>
        ))
      )}
    </Swiper>
  );
};

export default AdCardSliderPhotos;
