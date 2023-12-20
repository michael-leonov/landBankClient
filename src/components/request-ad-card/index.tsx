import React from 'react';

import { useAppSelector } from '../../redux/hooks';
import { selectUser } from '../../redux/slices/userSlice';
import { landCategories, landUse, noMatterCategory, typeOfUse } from '../../utils/consts';
import CustomButton from '../custom-button';
import EditAdBtn from '../edit-ad-btn';
import LandUserMutationRequestAdForm from '../land-user-purchase-request-form';
import LinkMailto from '../link-mailto';
import RequestAdCardProps from './interface';
import RemoveRequestAdBtn from './remove-request-ad-btn';
import * as S from './style';

const RequestAdCard = ({
  areaFrom,
  areaTo,
  id,
  irrigation,
  landCategory,
  landUse: landUseAd,
  priceFrom,
  priceTo,
  survey,
  typeOfUse: typeOfUseAd,
  user,
}: RequestAdCardProps) => {
  const formatedPrice = { priceFrom: priceFrom?.toFixed(1), priceTo: priceTo?.toFixed(1) };

  const featureMatchArr = (
    features: { title: string; value: string }[],
    featureAdValue: string[] | undefined,
  ): string[] => {
    const res: string[] = [];
    features.forEach((feature) => {
      if (featureAdValue?.includes(feature.value)) {
        res.push(feature.title);
      }
    });

    return res;
  };

  const findLandCategory = () => landCategories.find((category) => category.value === landCategory);

  const landCategoryMatch = findLandCategory();

  const landUseMatch = featureMatchArr([...landUse, noMatterCategory], landUseAd);
  const typeOfUseMatch = featureMatchArr([...typeOfUse, noMatterCategory], typeOfUseAd);

  const { userInfo } = useAppSelector(selectUser);

  const isMyAd = user.id === userInfo?.id;

  return (
    <>
      <S.RequestAdCardWrapper>
        <S.RequestAdCardTitle>Запрос на покупку #{id}</S.RequestAdCardTitle>
        <p>
          <b>Цена:</b> {formatedPrice.priceFrom && `от ${formatedPrice.priceFrom} ₽`}{' '}
          {formatedPrice.priceTo && formatedPrice.priceFrom && 'и'}{' '}
          {formatedPrice.priceTo && `до ${formatedPrice.priceTo} ₽`}
        </p>
        <p>
          <b>Площадь:</b> {areaFrom && `от ${areaFrom} Га`} {areaTo && areaFrom && 'и'}{' '}
          {areaTo && `до ${areaTo} Га`}
        </p>
        {landCategoryMatch && (
          <p>
            <b>Категория:</b> {landCategoryMatch.title}
          </p>
        )}

        <p>
          <b>Землепользование:</b> {landUseMatch.map((item) => item)}
        </p>

        <p>
          <b>Вид использования:</b> {typeOfUseMatch.map((item) => item)}
        </p>

        <p>
          <b>Орошение:</b>{' '}
          {irrigation === null ? noMatterCategory.title : irrigation ? 'Есть' : 'Отсутствует'}
        </p>

        <p style={{ marginBottom: '10px' }}>
          <b>Межевание:</b>{' '}
          {survey === null ? noMatterCategory.title : survey ? 'Проводилось' : 'Не проводилось'}
        </p>

        <CustomButton variant='outlined' disabled={false}>
          Связаться с <LinkMailto label='покупателем' mailto={user.email} />
        </CustomButton>

        {isMyAd && (
          <>
            <EditAdBtn
              form={
                <LandUserMutationRequestAdForm
                  isEditStatusForm={true}
                  ad={{
                    areaFrom,
                    areaTo,
                    id,
                    irrigation,
                    landCategory,
                    landUse: landUseAd,
                    priceFrom,
                    priceTo,
                    survey,
                    typeOfUse: typeOfUseAd,
                    user,
                  }}
                />
              }
            />
            <div>
              <RemoveRequestAdBtn id={id} />
            </div>
          </>
        )}
      </S.RequestAdCardWrapper>
    </>
  );
};

export default RequestAdCard;
