import React from 'react';

import place from '../../assets/place.jpeg';
import HomeBlockLink from '../../components/home-block-link';
import { useGetAdsCountQuery } from '../../redux/services/ads/adsApi';
import { StyledContainer, StyledSection } from '../../styles/common-styled-components/styles';
import { ANALYTICS_ROUTE, NEWS_ROUTE, pages } from '../../utils/consts';
import * as S from './styles';

const Home = () => {
  const { data, isSuccess } = useGetAdsCountQuery();

  return (
    <StyledSection>
      <StyledContainer>
        <S.HomeBlockList>
          {pages.map((page) => (
            <HomeBlockLink
              key={page.title}
              imgUrl={page.img}
              title={page.title}
              route={page.route}
            />
          ))}
          <HomeBlockLink
            imgUrl='https://s0.rbk.ru/v6_top_pics/media/img/8/55/756535866233558.jpg'
            title='Статистика'
            route='/'
          >
            {isSuccess && <p>Более {data.count} объявлений</p>}
          </HomeBlockLink>
          <HomeBlockLink
            imgUrl='https://www.sibdom.ru/images/photo_crop_1050_700/gallery/3c/3c32/3c3220d9d996885a4a1a1b72ac0c3345.jpg'
            title='Аналитика'
            route={ANALYTICS_ROUTE}
          />
          <HomeBlockLink imgUrl={place} title='Сделки слияния и поглощения' route='/' />
          <HomeBlockLink
            imgUrl='https://csotroitsk.ru/blog/wp-content/uploads/2022/10/77e59d2429bf4ba9cf47a8ddbbeb4f52.jpg'
            title='Новости'
            route={NEWS_ROUTE}
          />
          <HomeBlockLink
            imgUrl='https://csotroitsk.ru/blog/wp-content/uploads/2022/10/77e59d2429bf4ba9cf47a8ddbbeb4f52.jpg'
            title='Прочее'
            route='/'
          />
        </S.HomeBlockList>
      </StyledContainer>
    </StyledSection>
  );
};

export default Home;
