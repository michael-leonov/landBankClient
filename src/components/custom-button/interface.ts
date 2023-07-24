import { PropsWithChildren } from 'react';

interface CustomButtonProps extends PropsWithChildren {
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
  variant?: 'primary' | 'outlined';
}

export default CustomButtonProps;
