import React from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../redux/hooks';
import {
  useAddToFavoritiesAdsMutation,
  useMatchFavoriteAnnouncementQuery,
  useRemoveFromFavoritiesAdsMutation,
} from '../../redux/services/ads/adsApi';
import { selectUser } from '../../redux/slices/userSlice';
import loadingTextBtn from '../../utils/funcs/loadingTextBtn';
import CustomButton from '../custom-button';

const AddToFavoritesBtn = () => {
  const { id } = useParams();
  const { userInfo } = useAppSelector(selectUser);

  const [addToFavorities, { isLoading: isAdding }] = useAddToFavoritiesAdsMutation();

  const [removeFromFavorities, { isLoading: isRemoving }] = useRemoveFromFavoritiesAdsMutation();

  const { data, isLoading } = useMatchFavoriteAnnouncementQuery({
    announcementId: Number(id),
    userId: Number(userInfo?.id),
  });

  const onClickHandler = async (): Promise<void> => {
    if (data?.isFavorite) {
      await removeFromFavorities({
        announcementId: Number(id),
        userId: Number(userInfo?.id),
      }).unwrap();
    } else {
      await addToFavorities({
        announcementId: Number(id),
        userId: Number(userInfo?.id),
      }).unwrap();
    }
  };

  return (
    <CustomButton type='button' disabled={false} variant='outlined' onClick={onClickHandler}>
      {isLoading || isAdding || isRemoving
        ? loadingTextBtn
        : data?.isFavorite
        ? 'Удалить из избранного'
        : 'Добавить в избранное'}
    </CustomButton>
  );
};

export default AddToFavoritesBtn;
