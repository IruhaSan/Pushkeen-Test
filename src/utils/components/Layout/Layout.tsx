import React, { FC, useEffect } from 'react'
import Header from '../Header'

type IProps = {
    children?: any;
}

const Layout: FC<IProps> = ({ children }) => {
  return (
      <div>
        <Header />
        { children }
      </div>
  )
}

export default Layout