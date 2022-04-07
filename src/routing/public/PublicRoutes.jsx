import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Login from '../../components/auth/Login';

export const PublicRoutes = () => {

  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
        </Switch>
      </Router>
    </Fragment>
  )
}