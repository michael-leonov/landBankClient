import React from 'react';

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

  function pagination(c: number | string, m: number): (string | number)[] {
    const current = c,
      last = m,
      delta = 2,
      left = Number(current) - delta,
      right = Number(current) + delta + 1,
      range = [],
      rangeWithDots = [];
    let l;

    for (let i = 1; i <= last; i++) {
      if (i == 1 || i == last || (i >= left && i < right)) {
        range.push(i);
      }
    }

    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  }

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

        {pages.map((page) => (
          <S.Page
            key={page}
            active={(page === pageState).toString()} // Если здесь булевое значение вызывает ошибку, что у нативного элемента не может быть active={false}, нужно active='false'
            onClick={() => setPageState(page)}
          >
            <p>{page}</p>
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
