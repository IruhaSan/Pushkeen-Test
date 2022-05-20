import clsx from 'clsx'
import React, { FC } from 'react'
import classes from './Container.module.scss';

type IProps = {
    wrapperClassName?: string;
    className?: string;
    children?: any;
}

const Container: FC<IProps> = ({ wrapperClassName, className, children }) => {
  return (
      <div className={clsx(classes.root, wrapperClassName)}>
          <div className={clsx(classes.content, className)}>
                { children }
          </div>
      </div>
  )
}

export default Container