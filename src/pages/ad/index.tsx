/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import AdDetails from '../../components/ad-details';
import CustomButton from '../../components/custom-button';
import { useGetAdByIdQuery } from '../../redux/services/ads/adsApi';
import { StyledContainer, StyledSection } from '../../styles/common-styled-components/styles';
import * as S from './styles';

const Ad = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data, error, isError, isLoading, isSuccess } = useGetAdByIdQuery(Number(id));

  if (isLoading) {
    return <p>Загружаю..</p>;
  }

  // if (isError) {
  //   return <p>Ошибка: {error.message}</p>;
  // }

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
