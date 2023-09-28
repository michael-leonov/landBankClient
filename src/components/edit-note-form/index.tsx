/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { isFetchBaseQueryError, isErrorWithMessage } from '../../redux/services/helpers';
import { useEditNoteMutation } from '../../redux/services/notes/notesApi';
import loadingTextBtn from '../../utils/funcs/loadingTextBtn';
import FormValues from '../add-note-form/types';
import CustomButton from '../custom-button';
import S from './styles';
import { EditNoteFormProps } from './types';

const EditNoteForm = ({ description, id }: EditNoteFormProps) => {
  const [editNote, { isError, isLoading: isUpdating }] = useEditNoteMutation();
  const [isPrepareSubmit, setIsPrepareSubmit] = useState<boolean>(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    defaultValues: {
      description,
    },
    mode: 'all',
  });

  const [editNoteError, setEditNoteError] = useState<string>('');

  const onChangeInputHandler = (targetValue: string, defaultValue: string) => {
    if (defaultValue !== undefined) {
      if (targetValue.toString() !== defaultValue.toString()) {
        setIsPrepareSubmit(true);
      } else {
        setIsPrepareSubmit(false);
      }
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // const formData = new FormData();
    // formData.append('description', data.description);

    try {
      await editNote({ data, id })
        .unwrap()
        .catch((error) => {
          setEditNoteError(error.data.message);
        });
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const errMsg = 'error' in err ? err.error : JSON.stringify(err.data);
        setEditNoteError(errMsg);
      } else if (isErrorWithMessage(err)) {
        setEditNoteError(err.message);
      }
    }
  };

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.InputWrapper>
        <label>Описание заметки</label>
        <S.TextArea
          rows={5}
          {...register('description', {
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              onChangeInputHandler(e.target.value, description),
            required: 'Введите описание заметки',
          })}
        />
        {errors.description && <S.ErrorFormMsg>{errors.description.message}</S.ErrorFormMsg>}
      </S.InputWrapper>

      <CustomButton type='submit' variant='outlined' disabled={isUpdating || !isPrepareSubmit}>
        {isUpdating ? loadingTextBtn : 'Редактировать заметку'}
      </CustomButton>

      {isError && <S.ErrorFormMsg>{editNoteError}</S.ErrorFormMsg>}
    </S.Form>
  );
};

export default EditNoteForm;
