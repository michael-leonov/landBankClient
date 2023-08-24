import React from 'react';

import * as S from './styles';
import AreaUnitFilterProp from './types';

const AreaUnitFilter = ({ register, setAreaState, setValue }: AreaUnitFilterProp) => {
  return (
    <S.SelectAreaUnit
      {...(register('areaUnit'),
      {
        onChange: (e) => {
          setAreaState(e.target.options[e.target.selectedIndex].text);
          setValue('areaUnit', e.currentTarget.value);
        },
      })}
    >
      <option value='hectares'>Га</option>
      <option value='acres'>Сотки</option>
      <option value='sm'>Кв.м</option>
    </S.SelectAreaUnit>
  );
};

export default AreaUnitFilter;
