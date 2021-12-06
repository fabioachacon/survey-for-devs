import React from 'react';
import ReactDOM from 'react-dom';
import Routes from '../presentation/router';
import 'presentation/styles/global.scss';
import { LoginFactory } from './factories/pages/login/login-factory';

ReactDOM.render(
  <Routes makeLogin={LoginFactory} />,
  document.getElementById('root')
);
