import React from 'react';

import deals from '../../assets/pac2020.jpg';
import place from '../../assets/place.jpeg';
import stat from '../../assets/stat.jpg';
import HomeBlockLink from '../../components/home-block-link';
import { useGetAdsCountQuery } from '../../redux/services/ads/adsApi';
import { StyledContainer, StyledSection } from '../../styles/common-styled-components/styles';
import { ANALYTICS_ROUTE, NEWS_ROUTE, OTHER_ROUTE, pages } from '../../utils/consts';
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
          <HomeBlockLink imgUrl={stat} title='Статистика' route='/'>
            {isSuccess && <p>Более {data.count} объявлений</p>}
          </HomeBlockLink>
          <HomeBlockLink
            imgUrl='https://csotroitsk.ru/blog/wp-content/uploads/2022/10/77e59d2429bf4ba9cf47a8ddbbeb4f52.jpg'
            title='Аналитика'
            route={ANALYTICS_ROUTE}
          />
          <HomeBlockLink imgUrl={deals} title='Сделки слияния и поглощения' route='/' />
          <HomeBlockLink
            imgUrl='https://www.sibdom.ru/images/photo_crop_1050_700/gallery/3c/3c32/3c3220d9d996885a4a1a1b72ac0c3345.jpg'
            title='Новости'
            route={NEWS_ROUTE}
          />
          <HomeBlockLink imgUrl={place} title='Прочее' route={OTHER_ROUTE} />
        </S.HomeBlockList>
      </StyledContainer>
    </StyledSection>
  );
};

export default Home;
