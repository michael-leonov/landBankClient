import React from 'react';

import FilterEnumAreasProps from './interface';
import * as S from './styles';

const FilterEnumAreas = ({
  lettersArr,
  regionSelected,
  setRegionSelected,
}: FilterEnumAreasProps) => {
  return (
    <S.LettersWrapper>
      {lettersArr.map((letter) => (
        <S.Letter key={letter} onClick={() => setRegionSelected(letter)}>
          {regionSelected === letter ? <b>{letter}</b> : letter}
        </S.Letter>
      ))}
    </S.LettersWrapper>
  );
};

export default FilterEnumAreas;
