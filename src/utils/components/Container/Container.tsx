import clsx from 'clsx'
import React, { FC } from 'react'
import classes from './Container.module.scss';

type IProps = {
    wrapperClassName?: string;
    className?: string;
    children?: any;
    isExtended?: boolean;
}

const Container: FC<IProps> = ({ wrapperClassName, className, children, isExtended }) => {
  return (
      <div className={clsx(classes.wrapper, wrapperClassName)}>
          <div className={clsx(isExtended && classes.extended, className)}>
                { children }
          </div>
      </div>
  )
}

export default Container