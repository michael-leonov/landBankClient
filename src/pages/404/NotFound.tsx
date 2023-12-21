import React from 'react';

import { HOME_ROUTE } from '../../utils/consts';
import * as S from './styles';

const NotFound = () => {
  return (
    <S.NotFoundBlock>
      <S.NotFoundWrapper>
        <S.NotFoundTitleWrapper>
          <S.NotFoundTitle>404</S.NotFoundTitle>
        </S.NotFoundTitleWrapper>
        <S.NotFoundSubtitle>Что-то пошло не так...</S.NotFoundSubtitle>
        <S.NotFoundDescription>
          Страница, которую вы ищете, могла быть удалена из-за изменения ее названия или временно
          недоступна. <S.ReturnHomeLink to={HOME_ROUTE}>Вернуться на главную</S.ReturnHomeLink>
        </S.NotFoundDescription>
      </S.NotFoundWrapper>
    </S.NotFoundBlock>
  );
};

export default NotFound;
