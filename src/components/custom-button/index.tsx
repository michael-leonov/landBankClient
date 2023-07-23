import React from 'react';
import * as S from './styles';
import CustomButtonProps from './interface';

const CustomButton = ({
  type = 'button',
  children,
  onClick,
  disabled = false,
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
