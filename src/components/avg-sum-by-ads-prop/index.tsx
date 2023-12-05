import React from 'react';

import AvgSumByAdsPropProps from './interface';
import * as S from './styles';

const AvgSumByAdsProp = ({
  ads,
  currentTotal,
  isSuccess,
  prop,
  propText,
  toFixed,
  unit,
}: AvgSumByAdsPropProps) => {
  const reduceSumByAdsProp = (prop: string): number => {
    if (ads?.length) {
      return ads.reduce(
        // fix this
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (acc, curr: any) => acc + curr[prop],
        0,
      );
    }

    return 0;
  };

  let AdsAvgProp = 0;

  if (isSuccess && currentTotal !== undefined) {
    AdsAvgProp = reduceSumByAdsProp(prop) / currentTotal;
  }

  if (AdsAvgProp > 0) {
    return (
      <S.AvgTextByProp>
        {propText}:{' '}
        <b>
          {AdsAvgProp.toFixed(toFixed)} {unit}
        </b>
      </S.AvgTextByProp>
    );
  }

  return <></>;
};

export default AvgSumByAdsProp;
