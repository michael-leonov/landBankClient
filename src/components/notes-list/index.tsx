/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import { useAppSelector } from '../../redux/hooks';
import { INote } from '../../redux/services/ads/interface';
import { useGetNotesQuery } from '../../redux/services/ads/notesApi';
import { selectUser } from '../../redux/slices/userSlice';
import ErrorFetch from '../error-fetch';
import Note from '../note';
import * as S from './styles';

const NotesList = ({ adId }: { adId: number | undefined }) => {
  const { userInfo } = useAppSelector(selectUser);

  const { data, error, isError, isLoading, isSuccess } = useGetNotesQuery({
    announcementId: adId,
    userId: userInfo?.id,
  });

  const isEmptyList = !isLoading && !data?.totalCount;

  const windowWidth = window.outerWidth;

  if (isError) {
    return <ErrorFetch error={error} />;
  }

  if (isEmptyList) {
    return <div>Заметок нет</div>;
  }

  return (
    <div>
      <h3>Ваши заметки к этому объявлению</h3>
      <S.NotesListWrapper>
        {isSuccess &&
          data.listNotes.map((note: INote, index: number) => (
            <Note key={note.id} {...note} i={index} windowWidth={windowWidth} />
          ))}
      </S.NotesListWrapper>
    </div>
  );
};

export default NotesList;
