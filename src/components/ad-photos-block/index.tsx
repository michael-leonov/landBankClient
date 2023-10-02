import React from 'react';

import noImageAvailable from '../../assets/no-image.png';
import AdPhotosBlockProps from './interface';
import * as S from './styles';

const AdPhotosBlock = ({
  activeImg,
  isBankZemel,
  photos,
  setActiveImg,
  title,
}: AdPhotosBlockProps) => {
  const onErrorImageHandler = (currentTarget: EventTarget & HTMLImageElement): void => {
    currentTarget.onerror = null;
    currentTarget.style.display = 'none';

    const imgWrapper = currentTarget.parentElement as HTMLDivElement;
    imgWrapper.style.display = 'none';
  };

  return (
    <S.AdPhotosBlock>
      <S.CurrentAdvImageWrapper>
        <S.CurrentAdvImage
          src={
            !photos.length
              ? noImageAvailable
              : isBankZemel
              ? `${process.env.REACT_APP_API_URL}images/${photos[activeImg]}`
              : photos[activeImg]
          }
          alt={title}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = noImageAvailable;
          }}
        />
      </S.CurrentAdvImageWrapper>

      {photos.length > 1 && (
        <S.AdvImagesList>
          {photos.map((photo: string, i: number) => (
            <S.AdvImageWrapper key={photo} onClick={() => setActiveImg(i)} active={i === activeImg}>
              <S.AdvImage
                src={isBankZemel ? `${process.env.REACT_APP_API_URL}images/${photo}` : photo}
                alt={title}
                onError={({ currentTarget }) => onErrorImageHandler(currentTarget)}
              />
            </S.AdvImageWrapper>
          ))}
        </S.AdvImagesList>
      )}
    </S.AdPhotosBlock>
  );
};

export default AdPhotosBlock;
