/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import ContentLoader from 'react-content-loader';
import { useParams, useNavigate } from 'react-router-dom';

import AdDetails from '../../components/ad-details';
import CustomButton from '../../components/custom-button';
import ErrorFetch from '../../components/error-fetch';
import { useGetAdByIdQuery } from '../../redux/services/ads/adsApi';
import { StyledContainer, StyledSection } from '../../styles/common-styled-components/styles';
import * as S from './styles';

const Ad = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data, error, isError, isLoading, isSuccess } = useGetAdByIdQuery(Number(id));

  const loading = true;

  if (loading) {
    return (
      <StyledSection>
        <StyledContainer>
          <S.MobContentLoaderWrapper>
            <ContentLoader
              height='100%'
              width='100%'
              viewBox='0 0 320 750'
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
              <rect x='0' y='660' rx='6' ry='6' width='100' height='20' />
              <rect x='0' y='700' rx='6' ry='6' width='150' height='40' />
            </ContentLoader>
          </S.MobContentLoaderWrapper>
          <S.ContentLoaderWrapper>
            <ContentLoader
              height='100%'
              width='100%'
              viewBox='0 0 320 500'
              speed={2}
              backgroundColor='#d8d5d5'
              foregroundColor='#ecebeb'
            >
              <rect x='0' y='0' rx='6' ry='6' width='100%' height='40' />
              <rect x='0' y='0' rx='6' ry='6' width='100%' height='200' />
              <rect x='0' y='230' rx='6' ry='6' width='200' height='20' />
              <rect x='0' y='260' rx='6' ry='6' width='100%' height='50' />
              <rect x='0' y='320' rx='6' ry='6' width='180' height='20' />
              <rect x='0' y='350' rx='6' ry='6' width='100%' height='90' />
              <rect x='200' y='450' rx='6' ry='6' width='100' height='20' />
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
      <StyledContainer>
        <S.BackToSearchBtnWrapper>
          <CustomButton
            type='button'
            onClick={() => navigate(-1)}
            disabled={false}
            variant='outlined'
          >
            В поиск
          </CustomButton>
        </S.BackToSearchBtnWrapper>
      </StyledContainer>

      <AdDetails ad={data} />
    </StyledSection>
  );
};

export default Ad;
