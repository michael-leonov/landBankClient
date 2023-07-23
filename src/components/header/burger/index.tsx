import React from 'react';
import * as S from './styles';
import BurgerProps from './types';

const Burger = ({ open, setOpen }: BurgerProps) => (
  <S.Burger open={open} onClick={() => setOpen(!open)}>
    <div />
    <div />
    <div />
  </S.Burger>
);

export default Burger;
