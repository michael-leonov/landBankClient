import React from 'react';

import CustomButtonProps from './interface';
import * as S from './styles';

const CustomButton = ({
  children,
  disabled = false,
  onClick,
  type = 'button',
  variant = 'primary',
}: CustomButtonProps) => {
  if (variant === 'outlined') {
    return (
      <S.OutlinedBtn type={type} onClick={onClick} disabled={disabled}>
        {children}
      </S.OutlinedBtn>
    );
  }
  return (
    <S.PrimaryBtn type={type} onClick={onClick} disabled={disabled}>
      {children}
    </S.PrimaryBtn>
  );
};

export default CustomButton;
