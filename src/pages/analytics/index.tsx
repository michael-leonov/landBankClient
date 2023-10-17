import React from 'react';

import ArticleList from '../../components/articles-list';
import { StyledSection, StyledContainer } from '../../styles/common-styled-components/styles';

const Analytics = () => {
  const SECTION = 'analytics';

  return (
    <StyledSection>
      <StyledContainer>
        <h1>Аналитика</h1>
        <ArticleList section={SECTION} />
      </StyledContainer>
    </StyledSection>
  );
};

export default Analytics;
