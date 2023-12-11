import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import { StyledContainer, StyledSection } from '../../styles/common-styled-components/styles';
import { OTHER_LINKS_ROUTE } from '../../utils/consts';

const Other = () => {
  return (
    <StyledSection>
      <StyledContainer>
        <h1>Прочее</h1>
        <ul>
          <li>
            <Link to={OTHER_LINKS_ROUTE}>Полезные ссылки по земельным участкам</Link>
          </li>
        </ul>

        <Outlet />
      </StyledContainer>
    </StyledSection>
  );
};

export default Other;
