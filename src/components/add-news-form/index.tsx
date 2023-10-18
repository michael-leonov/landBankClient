import React, { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { SubmitHandler, useForm } from 'react-hook-form';

import { isFetchBaseQueryError, isErrorWithMessage } from '../../redux/services/helpers';
import { useAddNewsMutation } from '../../redux/services/news/newsApi';
import CustomButton from '../custom-button';
import SubmitingForm from '../submiting-form';
import { sections } from './sections.option';
import * as S from './styles';
import FormValues from './types';

const AddNewsForm = () => {
  const [addNews, { isError, isLoading: isAdding }] = useAddNewsMutation();
  const [cookies] = useCookies(['token']);

  const FileInputRef = useRef<HTMLInputElement>(null);

  const [articlePDF, setArticle] = useState<File>();
  const [isErrorNoArticle, setIsErrorNoArtcile] = useState<boolean>(false);
  const [addNewsError, setAddNewsError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setIsErrorNoArtcile(false);
      setArticle(e.target.files[0]);
    }
  };

  const {
    formState,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      section: 'news',
    },
    mode: 'all',
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (articlePDF) {
      const formData = new FormData();
      formData.append('article', articlePDF);

      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }

      try {
        await addNews({ data: formData, token: cookies.token })
          .unwrap()
          .catch((error) => {
            setAddNewsError(error.data.message);
          });
      } catch (err) {
        if (isFetchBaseQueryError(err)) {
          const errMsg = 'error' in err ? err.error : JSON.stringify(err.data);
          setAddNewsError(errMsg);
        } else if (isErrorWithMessage(err)) {
          setAddNewsError(err.message);
        }
      }
    } else {
      setIsErrorNoArtcile(true);
      setAddNewsError('Загрузите статью');
    }
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
      if (FileInputRef.current?.value) {
        FileInputRef.current.value = '';
      }
    }
  }, [formState, reset]);

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.InputWrapper>
        <label>Заголовок</label>
        <S.Input
          type='text'
          {...register('title', {
            required: 'Заполните поле',
          })}
        />
        {errors.title && <S.ErrorFormMsg>{errors.title.message}</S.ErrorFormMsg>}
      </S.InputWrapper>

      <S.InputWrapper>
        <label>Аннотация</label>
        <S.TextArea
          {...register('annotation', {
            required: 'Заполните поле',
          })}
        />
        {errors.annotation && <S.ErrorFormMsg>{errors.annotation.message}</S.ErrorFormMsg>}
      </S.InputWrapper>

      <S.InputWrapper>
        <label>Статья</label>
        <input type='file' accept='application/pdf' ref={FileInputRef} onChange={handleChange} />
      </S.InputWrapper>

      <S.Fieldset>
        <legend>Раздел новости</legend>
        {sections.map((section) => (
          <S.FieldsetInputWrapper key={section.value}>
            <input type='radio' value={section.value} {...register('section')} />
            <span>{section.title}</span>
          </S.FieldsetInputWrapper>
        ))}
      </S.Fieldset>
      <S.SubmitBtnWrapper>
        <CustomButton disabled={isAdding} type='submit' variant='outlined'>
          Разместить статью
        </CustomButton>
      </S.SubmitBtnWrapper>
      {(isError || isErrorNoArticle) && <S.ErrorFormMsg>{addNewsError}</S.ErrorFormMsg>}
      <SubmitingForm loading={isAdding} />
    </S.Form>
  );
};

export default AddNewsForm;
