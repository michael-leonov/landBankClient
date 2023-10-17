import React from 'react';

import ArticleList from '../../components/articles-list';
import { StyledSection, StyledContainer } from '../../styles/common-styled-components/styles';

const News = () => {
  const SECTION = 'news';
  return (
    <StyledSection>
      <StyledContainer>
        <h1>Новости</h1>
        <ArticleList section={SECTION} />
      </StyledContainer>
    </StyledSection>
  );
};

export default News;
