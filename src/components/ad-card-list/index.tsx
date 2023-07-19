/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import AdCard from '../ad-card';
import AdProps from '../ad-card/interface';

const AdCardList = ({ ads, isSuccess, isLoading, isError, isFetching }: any) => {
  return (
    <div>
      <h2>Ad card list</h2>
      {isSuccess && ads.map((ad: AdProps) => <AdCard key={ad.id} {...ad} />)}
    </div>
  );
};

export default AdCardList;
