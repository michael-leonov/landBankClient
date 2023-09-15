/* eslint-disable camelcase */
import React from 'react';

import editIcon from '../../assets/edit.png';
import removeIcon from '../../assets/remove.png';
import CustomButton from '../custom-button';
import NoteProps from './interface';
import * as S from './styles';

const Note = ({ create_at, description, i, windowWidth }: NoteProps) => {
  return (
    <S.NoteWrapper>
      <S.NoteDescriptionWrapper>
        <S.Index>{i + 1}.</S.Index>
        <div>
          <S.CreateAt>{create_at}</S.CreateAt>
          <S.Description width={windowWidth / 2}>{description}</S.Description>
        </div>
      </S.NoteDescriptionWrapper>

      <S.OperationWithNoteWrapper>
        <CustomButton disabled={false} variant='outlined'>
          <img src={editIcon} alt='Иконка редактирования' width={20} height={20} />
        </CustomButton>
        <CustomButton disabled={false} variant='outlined'>
          <img src={removeIcon} alt='Иконка удаления' width={20} height={20} />
        </CustomButton>
      </S.OperationWithNoteWrapper>
    </S.NoteWrapper>
  );
};

export default Note;
