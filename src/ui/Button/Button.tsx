import React, { FC } from 'react'

type IProps = {
    children: any;
    onClick: {(): void};
}

const Button: FC<IProps> = ({ onClick, children }) => {
  return (
      <button onClick={onClick}> { children }</button>
  )
}

export default Button