import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppSelector } from '../../redux/hooks';
import { useAddNoteMutation } from '../../redux/services/ads/notesApi';
import { isFetchBaseQueryError, isErrorWithMessage } from '../../redux/services/helpers';
import { selectUser } from '../../redux/slices/userSlice';
import loadingTextBtn from '../../utils/funcs/loadingTextBtn';
import CustomButton from '../custom-button';
import AddCommentFormProps from './interface';
import * as S from './styles';
import FormValues from './types';

const AddCommentForm = ({ adId }: AddCommentFormProps) => {
  const { userInfo } = useAppSelector(selectUser);
  const [addNote, { isError, isLoading: isAdding }] = useAddNoteMutation();

  const {
    formState: { errors },
    formState,
    handleSubmit,
    register,
    reset,
  } = useForm<FormValues>({ mode: 'all' });

  const [addNoteError, setAddNoteError] = useState<string>('');

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (userInfo && adId) {
      const body = { announcementId: adId, description: data.description, userId: userInfo.id };

      try {
        await addNote(body)
          .unwrap()
          .catch((error) => {
            setAddNoteError(error.data.message);
          });
      } catch (err) {
        if (isFetchBaseQueryError(err)) {
          const errMsg = 'error' in err ? err.error : JSON.stringify(err.data);
          setAddNoteError(errMsg);
        } else if (isErrorWithMessage(err)) {
          setAddNoteError(err.message);
        }
      }
    }
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.InputWrapper>
        <label>Описание заметки</label>
        <S.TextArea
          rows={5}
          {...register('description', {
            required: 'Введите описание заметки',
          })}
        />
        {errors.description && <S.ErrorFormMsg>{errors.description.message}</S.ErrorFormMsg>}
      </S.InputWrapper>

      <CustomButton type='submit' variant='outlined' disabled={isAdding}>
        {isAdding ? loadingTextBtn : 'Добавить заметку'}
      </CustomButton>

      {isError && <S.ErrorFormMsg>{addNoteError}</S.ErrorFormMsg>}
    </S.Form>
  );
};

export default AddCommentForm;
