/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import AdPagesProps from './interface';

const AdsPages = ({ limit, totalCount, page, setPage }: AdPagesProps) => {
  const pageCount = Math.ceil(totalCount / limit);
  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  return (
    <div>
      {pages.map((page) => (
        <div
          key={page}
          // active={page === page}
          onClick={() => setPage(page)}
        >
          {page}
        </div>
      ))}
    </div>
  );
};

export default AdsPages;
