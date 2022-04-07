import React, { Fragment } from 'react'
import { PrivateRoutes, PublicRoutes } from './routing/Routes'
import './App.css';

const App = () => {

  const isLogin = sessionStorage.getItem('is_login') || false;

  return (
    <Fragment>
      {
        isLogin ? (
          <PrivateRoutes />
        ): (
          <PublicRoutes />
        )
      }
    </Fragment>
  )
}

export default App