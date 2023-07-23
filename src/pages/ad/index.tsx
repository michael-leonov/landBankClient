/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetAdByIdQuery } from '../../redux/services/ads';
import CustomButton from '../../components/custom-button';
import { StyledContainer, StyledSection } from '../../styles/common-styled-components/styles';
import AdDetails from '../../components/ad-details';
import * as S from './styles';

const Ad = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data, isLoading, isError, isSuccess, error } = useGetAdByIdQuery(Number(id));

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
