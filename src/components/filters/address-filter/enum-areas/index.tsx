import React from 'react';

import reduceRegionByName from '../../../../utils/funcs/reduceRegionByName';
import EmunAreasProps from './interface';
import * as S from './styles';

const EnumAreas = ({ lettersArr, regionSelected, register }: EmunAreasProps) => {
  const regionsByLetter = reduceRegionByName();

  let filterLetterArr: string[];

  if (regionSelected) {
    filterLetterArr = [regionSelected];
  } else {
    filterLetterArr = lettersArr;
  }

  return (
    <S.EnumAreasBlock>
      {filterLetterArr.map((letter) => (
        <div key={letter}>
          <S.Letter>{letter}</S.Letter>
          <S.EnumAreasWrapper>
            {regionsByLetter[letter].map((region) => (
              <S.RegionLabel key={region.kladr_id}>
                <input
                  type='checkbox'
                  value={region.kladr_id}
                  {...register('address', {
                    required: false,
                  })}
                />
                <span>{region.name_with_type}</span>
              </S.RegionLabel>
            ))}
          </S.EnumAreasWrapper>
        </div>
      ))}
    </S.EnumAreasBlock>
  );
};

export default EnumAreas;
