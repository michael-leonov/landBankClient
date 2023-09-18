/* eslint-disable camelcase */
import React, { useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';

import editIcon from '../../assets/edit.png';
import removeIcon from '../../assets/remove.png';
import { useRemoveNoteMutation } from '../../redux/services/ads/notesApi';
import { isFetchBaseQueryError, isErrorWithMessage } from '../../redux/services/helpers';
import CustomButton from '../custom-button';
import EditNoteForm from '../edit-note-form';
import OpenFormBtn from '../open-form-btn';
import NoteProps from './interface';
import * as S from './styles';

const Note = ({ create_at, description, i, id, windowWidth }: NoteProps) => {
  const [removeNote, { isError, isLoading: isRemoving }] = useRemoveNoteMutation();
  const [removeNoteError, setRemoveNoteError] = useState<string>('');

  const onDeleteNoteHandler = async () => {
    try {
      await removeNote(id)
        .unwrap()
        .catch((error) => {
          setRemoveNoteError(error.data.message);
        })
        .finally(() => {
          setTimeout(() => setRemoveNoteError(''), 3000);
        });
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const errMsg = 'error' in err ? err.error : JSON.stringify(err.data);
        setRemoveNoteError(errMsg);
      } else if (isErrorWithMessage(err)) {
        setRemoveNoteError(err.message);
      }
    }
  };
  return (
    <div>
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
          <CustomButton disabled={isRemoving} variant='outlined' onClick={onDeleteNoteHandler}>
            {isRemoving ? (
              <RotatingLines
                strokeColor='grey'
                strokeWidth='5'
                animationDuration='0.75'
                width='20'
                visible={isRemoving}
              />
            ) : (
              <img src={removeIcon} alt='Иконка удаления' width={20} height={20} />
            )}
          </CustomButton>
        </S.OperationWithNoteWrapper>
      </S.NoteWrapper>
      {isError && <div>{removeNoteError}</div>}
    </div>
  );
};

export default Note;
