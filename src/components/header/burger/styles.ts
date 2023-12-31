import styled, { css } from 'styled-components';

import { device } from '../../../utils/consts';

export const colors = {
  lightblue: '#93CEF0',
  lightbrown: '#be8b7b',
  pearl: '#fdf2e9',
  yellowmellow: '#fbe69b',
};

export const Burger = styled.button<{ open: boolean }>`
  position: fixed;
  right: 3vw;
  top: 7px;
  width: 2rem;
  height: 2rem;
  padding: 0;
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border: none;
  cursor: pointer;
  outline: none;
  z-index: 3;
  transition: all 0.3s linear;

  @media (min-width: 576px) {
    ${({ open }) =>
      open
        ? css`
            left: 38vw;
            top: 10px;
          `
        : css`
            right: 3vw;
          `}
  }

  @media ${device.tablet} {
    ${({ open }) =>
      open
        ? css`
            left: 40vw;
          `
        : css`
            right: 3vw;
          `}
  }

  @media ${device.laptop} {
    display: none;
  }

  div {
    position: relative;
    width: 2rem;
    height: 0.25rem;
    border-radius: 10px;
    transition: all 0.3s linear;
    transform-origin: 1px;
    background-color: ${({ open }) => (open ? 'black' : 'grey')};

    &:first-child {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }

    &:nth-child(2) {
      width: 1.5rem;
      margin-left: auto;
      opacity: ${({ open }) => (open ? '0' : '1')};
      transform: ${({ open }) => (open ? 'translateX(20px)' : 'translateX(0)')};
    }

    &:nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;
