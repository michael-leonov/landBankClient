import React, { useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { useAppSelector } from '../../redux/hooks';
import { isFetchBaseQueryError, isErrorWithMessage } from '../../redux/services/helpers';
import { INews } from '../../redux/services/news/interface';
import { useRemoveNewsMutation } from '../../redux/services/news/newsApi';
import { selectUser } from '../../redux/slices/userSlice';
import { Role } from '../../redux/slices/userSlice/interface';
import { Overlay } from '../../styles/common-styled-components/styles';
import { userRoles } from '../../utils/consts';
import formateDate from '../../utils/funcs/formateDate';
import EditNewsForm from '../edit-news-form';
import SubmitingForm from '../submiting-form';
import * as S from './styles';

const ArticleCard = ({ annotation, create_at: createAt, id, section, title }: INews) => {
  const { userInfo } = useAppSelector(selectUser);

  const isAdsEditor = userInfo?.roles.some(
    (role: Role): boolean => role?.value == (userRoles.adsEditor || userRoles.admin),
  );

  const [isOpenEditForm, setIsOpenEditForm] = useState<boolean>(false);

  const openFormHanlder = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsOpenEditForm(true);
  };

  const [removeNews, { isError, isLoading: isRemoving }] = useRemoveNewsMutation();
  const [removeError, setRemoveError] = useState<string>('');
  const [cookies] = useCookies(['token']);

  const onDeleteHanlder = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    try {
      await removeNews({ id, token: cookies.token })
        .unwrap()
        .catch((error) => {
          setRemoveError(error.data.message);
        });
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const errMsg = 'error' in err ? err.error : JSON.stringify(err.data);
        setRemoveError(errMsg);
      } else if (isErrorWithMessage(err)) {
        setRemoveError(err.message);
      }
    }
  };

  const formWrapperRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(formWrapperRef, () => setIsOpenEditForm(false));

  return (
    <>
      <Link to={`/${section}/article/${id}`}>
        <S.ArticleCard>
          <S.CreateAt>{formateDate(createAt)}</S.CreateAt>
          <S.Title>{title}</S.Title>
          <S.Annotation isAdsEditor={isAdsEditor}>{annotation}</S.Annotation>
          {isAdsEditor && (
            <>
              <S.EventButtonWrapper>
                <S.EventButton onClick={openFormHanlder}>Редактировать</S.EventButton>
                <S.EventButton onClick={onDeleteHanlder}>Удалить</S.EventButton>
              </S.EventButtonWrapper>
              {isError && <S.ErrorFormMsg>{removeError}</S.ErrorFormMsg>}
            </>
          )}
          <SubmitingForm loading={isRemoving} />
        </S.ArticleCard>
      </Link>
      {isOpenEditForm && (
        <Overlay>
          <S.EditFormWrapper ref={formWrapperRef}>
            <EditNewsForm {...{ annotation, id, section, title }} />
            <S.CloseFormBtn onClick={() => setIsOpenEditForm(false)} />
          </S.EditFormWrapper>
        </Overlay>
      )}
    </>
  );
};

export default ArticleCard;
