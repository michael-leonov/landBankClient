import React from 'react';
import ContentLoader from 'react-content-loader';
import { useParams } from 'react-router-dom';

import AdDetails from '../../components/ad-details';
import ErrorFetch from '../../components/error-handling';
import { useGetAdByIdQuery } from '../../redux/services/ads/adsApi';
import { StyledContainer, StyledSection } from '../../styles/common-styled-components/styles';
import * as S from './styles';

const Ad = () => {
  const { id } = useParams();

  const { data, error, isError, isLoading } = useGetAdByIdQuery(Number(id));

  if (isLoading) {
    return (
      <StyledSection>
        <StyledContainer>
          <S.MobContentLoaderWrapper>
            <ContentLoader
              height='100%'
              width='100%'
              viewBox='0 0 320 650'
              speed={2}
              backgroundColor='#d8d5d5'
              foregroundColor='#ecebeb'
            >
              <rect x='0' y='0' rx='6' ry='6' width='180' height='30' />
              <rect x='0' y='40' rx='6' ry='6' width='120' height='25' />
              <rect x='0' y='75' rx='6' ry='6' width='150' height='15' />
              <rect x='0' y='100' rx='6' ry='6' width='100%' height='55' />
              <rect x='0' y='165' rx='0' ry='0' width='320' height='320' />
              <rect x='0' y='500' rx='6' ry='6' width='100%' height='150' />
            </ContentLoader>
          </S.MobContentLoaderWrapper>
          <S.ContentLoaderWrapper>
            <ContentLoader
              height='100%'
              width='100%'
              viewBox='0 0 650 500'
              speed={2}
              backgroundColor='#d8d5d5'
              foregroundColor='#ecebeb'
            >
              <rect x='0' y='10' rx='6' ry='6' width='50%' height='200' />
              <rect x='0' y='220' rx='6' ry='6' width='75' height='50' />
              <rect x='79' y='220' rx='6' ry='6' width='75' height='50' />
              <rect x='158' y='220' rx='6' ry='6' width='75' height='50' />
              <rect x='237' y='220' rx='6' ry='6' width='75' height='50' />
              <rect x='52%' y='10' rx='6' ry='6' width='220' height='30' />
              <rect x='52%' y='50' rx='6' ry='6' width='180' height='30' />
              <rect x='52%' y='90' rx='6' ry='6' width='48%' height='50' />
              <rect x='0' y='280' rx='6' ry='6' width='100%' height='150' />
            </ContentLoader>
          </S.ContentLoaderWrapper>
        </StyledContainer>
      </StyledSection>
    );
  }

  if (isError) {
    return <ErrorFetch error={error} />;
  }

  return (
    <StyledSection>
      <AdDetails ad={data} />
    </StyledSection>
  );
};

export default Ad;
