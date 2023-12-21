import React, { useState } from 'react';

import RequestAdsCardList from '../../components/request-ads-card-list';
import { useGetRequestAdsQuery } from '../../redux/services/request-ads/requestAdsApi';
import { StyledContainer, StyledSection } from '../../styles/common-styled-components/styles';

const RequestAds = () => {
  const LIMIT: number = 20;

  const [page, setPage] = useState<string | number>(1);

  const getRequestAdsQuery = useGetRequestAdsQuery({
    limit: LIMIT,
    page: Number(page),
    userId: undefined,
  });

  return (
    <StyledSection>
      <StyledContainer>
        <h1>Запросы на покупку земельных участков</h1>
        <RequestAdsCardList {...getRequestAdsQuery} limit={LIMIT} page={page} setPage={setPage} />
      </StyledContainer>
    </StyledSection>
  );
};

export default RequestAds;
