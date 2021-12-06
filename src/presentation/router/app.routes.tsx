import React, { FunctionComponent } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Login } from 'presentation/pages';

type RouterProps = {
  makeLogin: FunctionComponent;
};

const Router = (props: RouterProps) => {
  const { makeLogin } = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={makeLogin} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
