/* eslint-disable camelcase */
import React from 'react';

import editIcon from '../../assets/edit.png';
import removeIcon from '../../assets/remove.png';
import CustomButton from '../custom-button';
import EditNoteForm from '../edit-note-form';
import OpenFormBtn from '../open-form-btn';
import NoteProps from './interface';
import * as S from './styles';

const Note = ({ create_at, description, i, id, windowWidth }: NoteProps) => {
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
        <OpenFormBtn
          btnText={<img src={editIcon} alt='Иконка редактирования' width={20} height={20} />}
          formComponent={<EditNoteForm id={id} description={description} />}
        />
        <CustomButton disabled={false} variant='outlined'>
          <img src={removeIcon} alt='Иконка удаления' width={20} height={20} />
        </CustomButton>
      </S.OperationWithNoteWrapper>
    </S.NoteWrapper>
  );
};

export default Note;
