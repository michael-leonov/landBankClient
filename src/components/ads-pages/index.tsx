import React from 'react';

import pagination from '../../utils/funcs/pagination';
import AdPagesProps from './interface';
import * as S from './styles';

const AdsPages = ({
  isFetching,
  isLoading,
  limit,
  pageState,
  setPageState,
  totalCount,
}: AdPagesProps) => {
  const pageCount = Math.ceil(totalCount / limit);
  const pages = pagination(pageState, pageCount);

  const prevPageHandler = (): void => {
    if (Number(pageState) - 1 === 0) {
      setPageState(pageCount);
    } else {
      setPageState((prev) => Number(prev) - 1);
    }
  };

  const nextPageHandler = (): void => {
    if (Number(pageState) + 1 > pageCount) {
      setPageState(1);
    } else {
      setPageState((prev) => Number(prev) + 1);
    }
  };

  if (!isLoading || !isFetching) {
    return (
      <S.PagesWrapper>
        {pages.length !== 1 && (
          <S.Page active='false' onClick={prevPageHandler}>
            ❮
          </S.Page>
        )}

        {pages.length > 1 &&
          pages.map((page) => (
            <S.Page
              key={page}
              active={(page === pageState).toString()}
              onClick={() => setPageState(page)}
            >
              {page}
            </S.Page>
          ))}
        {pages.length !== 1 && (
          <S.Page active='false' onClick={nextPageHandler}>
            ❯
          </S.Page>
        )}
      </S.PagesWrapper>
    );
  }

  return <></>;
};

export default AdsPages;
