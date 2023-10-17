import React from 'react';
import { RotatingSquare } from 'react-loader-spinner';

import * as S from './styles';

const SubmitingForm = ({ loading = false }: { loading: boolean }) => {
  if (loading) {
    return (
      <S.SubmitingFormOverlay>
        <RotatingSquare
          height='100'
          width='100'
          color='#4fa94d'
          ariaLabel='rotating-square-loading'
          strokeWidth='4'
          visible={loading}
        />
      </S.SubmitingFormOverlay>
    );
  }

  return null;
};

export default SubmitingForm;
