import React from 'react';

import HomeBlockInfo from '../../components/home-block-info';
import { useGetAdsQuery } from '../../redux/services/ads/adsApi';
import { StyledContainer, StyledSection } from '../../styles/common-styled-components/styles';
import * as S from './styles';

const Home = () => {
  const { data, isSuccess } = useGetAdsQuery({
    limit: undefined,
    page: undefined,
  });

  return (
    <StyledSection>
      <StyledContainer>
        <S.HomeBlockList>
          <HomeBlockInfo
            imgUrl='https://s0.rbk.ru/v6_top_pics/media/img/8/55/756535866233558.jpg'
            title='Статистика'
          >
            {isSuccess && <p>Более {data?.totalCount} объявлений</p>}
          </HomeBlockInfo>
          <HomeBlockInfo
            imgUrl='https://www.sibdom.ru/images/photo_crop_1050_700/gallery/3c/3c32/3c3220d9d996885a4a1a1b72ac0c3345.jpg'
            title='Аналитика'
          />
          <HomeBlockInfo
            imgUrl='https://burokadastr.ru/wp-content/uploads/obraz-zemel.jpg'
            title='Сделки слияния и поглощения'
          />
          <HomeBlockInfo
            imgUrl='https://csotroitsk.ru/blog/wp-content/uploads/2022/10/77e59d2429bf4ba9cf47a8ddbbeb4f52.jpg'
            title='Новости'
          />
          <HomeBlockInfo
            imgUrl='https://csotroitsk.ru/blog/wp-content/uploads/2022/10/77e59d2429bf4ba9cf47a8ddbbeb4f52.jpg'
            title='Прочее'
          />
        </S.HomeBlockList>
      </StyledContainer>
    </StyledSection>
  );
};

export default Home;
