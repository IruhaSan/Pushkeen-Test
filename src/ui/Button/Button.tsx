import clsx from 'clsx';
import React, { FC } from 'react'
import classes from './Button.module.scss';

export enum ButtonSizeEnum {
  TINY = 'tiny',
  SMALL = 'small',
  MEDIUM = 'medium',
}

export enum ButtonColorEnum {
  BLACK = 'black',
  WHITE = 'white'
}

export enum ButtonStyleEnum {
  FILLED = 'filled',
  TRANSPARENT = 'transparent'
}

type IProps = {
    children: React.ReactNode;
    onClick: {(): void};
    className?: string;
    style?: ButtonStyleEnum;
    color?: ButtonColorEnum;
    size?: ButtonSizeEnum;
    isFullWidth?: boolean;
}

const Button: FC<IProps> = ({ 
  onClick, 
  children, 
  className, 
  style = ButtonStyleEnum.FILLED, 
  color = ButtonColorEnum.BLACK,
  size = ButtonSizeEnum.SMALL,
  isFullWidth 
}) => {
  return (
      <button 
        className={clsx(
          classes.root, 
          classes[style],
          classes[color],
          classes[size],
          isFullWidth && classes.isFullWidth,
          className
        )} 
        onClick={onClick}
      >
        { children }
      </button>
  )
}

export default Button