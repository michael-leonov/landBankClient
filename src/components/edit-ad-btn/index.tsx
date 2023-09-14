import React, { useRef, useState } from 'react';

import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { Overlay } from '../../styles/common-styled-components/styles';
import AdDetailsProps from '../ad-details/interface';
import CustomButton from '../custom-button';
import EditAdForm from '../edit-ad-form';
import * as S from './styles';

const EditAdBtn = ({ ad }: AdDetailsProps) => {
  const [openEditForm, setOpenEditForm] = useState<boolean>(false);

  const formWrapperRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(formWrapperRef, () => setOpenEditForm(false));

  return (
    <>
      <CustomButton
        type='button'
        disabled={false}
        variant='outlined'
        onClick={() => setOpenEditForm(true)}
      >
        Редактировать объявление
      </CustomButton>

      {openEditForm && (
        <Overlay>
          <S.EditFormWrapper ref={formWrapperRef}>
            <EditAdForm ad={ad} />
            <S.CloseFormBtn onClick={() => setOpenEditForm(false)} />
          </S.EditFormWrapper>
        </Overlay>
      )}
    </>
  );
};

export default EditAdBtn;
