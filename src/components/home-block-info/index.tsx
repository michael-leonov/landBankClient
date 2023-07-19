import React from 'react';
import HomeBlockInfoProps from './interface';

const HomeBlockInfo = ({ imgUrl, title, children }: HomeBlockInfoProps) => {
  return (
    <div>
      <img src={imgUrl} />
      <h3>{title}</h3>
      {children}
    </div>
  );
};

export default HomeBlockInfo;
