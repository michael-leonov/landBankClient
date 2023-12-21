import React, { useReducer, useRef } from 'react';

import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { Overlay } from '../../styles/common-styled-components/styles';
import CustomButton from '../custom-button';
import * as S from './styles';

const EditAdBtn = ({ form }: { form: JSX.Element }) => {
  const [openEditForm, toggleOpenEditForm] = useReducer((v) => !v, false);

  const formWrapperRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(formWrapperRef, toggleOpenEditForm);

  return (
    <>
      <CustomButton type='button' disabled={false} variant='outlined' onClick={toggleOpenEditForm}>
        Редактировать
      </CustomButton>

      {openEditForm && (
        <Overlay>
          <S.EditFormWrapper ref={formWrapperRef}>
            {form}
            <S.CloseFormBtn onClick={toggleOpenEditForm} />
          </S.EditFormWrapper>
        </Overlay>
      )}
    </>
  );
};

export default EditAdBtn;
