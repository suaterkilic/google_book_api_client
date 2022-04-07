import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from '../../components/home/Home';
import BookMarks from "../../components/bookmarks/BookMarks";

export const PrivateRoutes = () => {

  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/bookmarks' component={BookMarks} />
        </Switch>
      </Router>
    </Fragment>
  )
}