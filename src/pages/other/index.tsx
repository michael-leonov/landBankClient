/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import UsefulLinks from '../../components/other-page-components/useful-links';
import { StyledContainer, StyledSection } from '../../styles/common-styled-components/styles';
import { OTHER_LINKS_ROUTE } from '../../utils/consts';

const Other = () => {
  return (
    <StyledSection>
      <StyledContainer>
        <h1 style={{ marginBottom: '20px' }}>Прочее</h1>
        {/* <ul>
          <li>
            <Link to={OTHER_LINKS_ROUTE}>Полезные ссылки по земельным участкам</Link>
          </li>
        </ul>

        <Outlet /> */}

        <h3>Полезные ссылки по земельным участкам</h3>
        <UsefulLinks />
      </StyledContainer>
    </StyledSection>
  );
};

export default Other;
