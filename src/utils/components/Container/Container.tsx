import clsx from 'clsx'
import React, { FC } from 'react'
import classes from './Container.module.scss';

type IProps = {
    wrapperClassName?: string;
    className?: string;
    children?: any;
    isExtended?: boolean;
    isWrapperExtended?: boolean;
}

const Container: FC<IProps> = ({ wrapperClassName, className, children, isExtended, isWrapperExtended }) => {
  return (
      <div className={clsx(isWrapperExtended ? classes['wrapper-extended'] : classes.wrapper, wrapperClassName)}>
          <div className={clsx(isExtended && classes.extended, className)}>
                { children }
          </div>
      </div>
  )
}

export default Container