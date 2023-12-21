import React from 'react';

import { announcementStatuses } from '../../utils/consts';
import SelectStatusAdsProps from './interface';
import * as S from './styles';

const SelectStatusAds = ({ setStatus, status }: SelectStatusAdsProps) => {
  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setStatus(e.target.options[e.target.selectedIndex].value);

  return (
    <S.SelectStatus onChange={onChangeSelect} defaultValue={status}>
      {announcementStatuses.map((status, i) => (
        <option key={i} value={status.value}>
          {status.title}
        </option>
      ))}
    </S.SelectStatus>
  );
};

export default SelectStatusAds;
