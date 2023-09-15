import { useState, useRef } from 'react';

import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { Overlay } from '../../styles/common-styled-components/styles';
import CustomButton from '../custom-button';
import OpenFormBtnProps from './interface';
import * as S from './styles';

const OpenFormBtn = ({ btnText, formComponent }: OpenFormBtnProps) => {
  const [openForm, setOpenForm] = useState<boolean>(false);

  const formWrapperRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(formWrapperRef, () => setOpenForm(false));

  return (
    <>
      <CustomButton
        type='button'
        disabled={false}
        variant='outlined'
        onClick={() => setOpenForm(true)}
      >
        {btnText}
      </CustomButton>

      {openForm && (
        <Overlay>
          <S.FormWrapper ref={formWrapperRef}>
            {formComponent}
            <S.CloseFormBtn onClick={() => setOpenForm(false)} />
          </S.FormWrapper>
        </Overlay>
      )}
    </>
  );
};

export default OpenFormBtn;
