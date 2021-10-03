import React from 'react';
import ReactDOM from 'react-dom';
import Routes from '../presentation/router';
import 'presentation/styles/global.scss';
import { makeLogin } from './factories/pages/login/login-factory';

ReactDOM.render(
  <Routes makeLogin={makeLogin} />,
  document.getElementById('root')
);
