import React from 'react';

import { FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import NavSliderProps from './interface';
import * as S from './styles';

import 'swiper/css';
import 'swiper/css/free-mode';

const NavSlider = ({ activeSideBarLink, links, onClickLinkHandler }: NavSliderProps) => {
  return (
    <S.SideBarNav>
      <Swiper
        slidesPerView={2.3}
        freeMode={true}
        spaceBetween={10}
        grabCursor={true}
        modules={[FreeMode]}
      >
        {links.map((link) => (
          <SwiperSlide key={link.id}>
            <S.NavSlide>
              <S.Link
                to={link.link}
                active={activeSideBarLink.activeId === link.id}
                onClick={() => onClickLinkHandler(link.id)}
              >
                {link.title}
              </S.Link>
            </S.NavSlide>
          </SwiperSlide>
        ))}
      </Swiper>
    </S.SideBarNav>
  );
};

export default NavSlider;
