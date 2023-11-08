import React from 'react';

import { AnnouncementStatuses } from '../../utils/enums';
import SelectStatusAdsProps from './interface';
import * as S from './styles';

const SelectStatusAds = ({ setStatus, status }: SelectStatusAdsProps) => {
  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setStatus(e.target.options[e.target.selectedIndex].value);

  return (
    <S.SelectStatus onChange={onChangeSelect} defaultValue={status}>
      <option value={AnnouncementStatuses.ACTIVE}>Активные</option>
      <option value={AnnouncementStatuses.AWAIT}>Ожидают подтверждения</option>
      <option value={AnnouncementStatuses.REJECTED}>Отклоненные</option>
      <option value={AnnouncementStatuses.INACTIVE}>Снятые с публикации</option>
    </S.SelectStatus>
  );
};

export default SelectStatusAds;
