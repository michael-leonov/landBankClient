/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import * as S from './styles';
import noImageAvailable from '../../assets/no-image.png';

const AdPhotosBlock = ({ photos, title, activeImg, setActiveImg }: any) => {
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
          src={photos[activeImg]}
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
                src={photo}
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
