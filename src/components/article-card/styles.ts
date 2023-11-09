import styled from 'styled-components';

export const ArticleCard = styled.div`
  padding: 8px;
  box-shadow:
    -8px -8px 15px -4px rgba(199, 200, 201, 0.5) inset,
    -8px -8px 15px -4px rgba(199, 200, 201, 0.5);
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.3s ease-in-out;
  position: relative;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export const CreateAt = styled.p`
  margin-bottom: 4px;
`;

export const Title = styled.h3`
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Annotation = styled.p<{ isAdsEditor: boolean | undefined }>`
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #737a8e;
  margin-bottom: ${({ isAdsEditor }) => isAdsEditor && '10px'};
`;

export const EventButtonWrapper = styled.div`
  display: flex;
  column-gap: 10px;
`;

export const EventButton = styled.button`
  color: #a9a9a9;
  transition: color 0.2s ease-in;

  &:hover {
    color: black;
  }
`;

export const ErrorFormMsg = styled.p`
  color: lightcoral;
  text-align: center;
`;

export const EditFormWrapper = styled.div`
  background-color: #fff;
  z-index: 3;
  position: absolute;
  left: 50%;
  top: 50%;
  max-width: 500px;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 90%;
  overflow-y: auto;
`;

export const CloseFormBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition:
    background-color 0.3s ease-in-out,
    border-radius 0.3s ease-in-out;

  &::before,
  &::after {
    height: 1px;
    position: absolute;
    width: 80%;
    content: '';
    background-color: black;
    top: 14px;
    left: 3px;
  }

  &::before {
    rotate: 45deg;
  }

  &::after {
    rotate: -45deg;
  }

  &:hover {
    background-color: #545454;
    border-radius: 50%;

    &::before,
    &::after {
      background-color: white;
    }
  }
`;