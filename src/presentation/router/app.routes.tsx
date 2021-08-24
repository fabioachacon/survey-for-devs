import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Login } from 'presentation/pages';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
