/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import * as S from './styles';

const AdPhotosBlock = ({ photos, title, activeImg, setActiveImg }: any) => {
  return (
    <S.AdPhotosBlock>
      <S.CurrentAdvImageWrapper>
        <S.CurrentAdvImage src={photos[activeImg]} alt={title} />
      </S.CurrentAdvImageWrapper>

      {photos.length > 1 && (
        <S.AdvImagesList>
          {photos.map((photo: string, i: number) => (
            <S.AdvImageWrapper key={photo} onClick={() => setActiveImg(i)} active={i === activeImg}>
              <S.AdvImage src={photo} alt={title} />
            </S.AdvImageWrapper>
          ))}
        </S.AdvImagesList>
      )}
    </S.AdPhotosBlock>
  );
};

export default AdPhotosBlock;
