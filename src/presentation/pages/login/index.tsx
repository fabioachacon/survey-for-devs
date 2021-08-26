import React, { useState } from 'react';
import FormContext from 'presentation/contexts/form/form-context';

import Styles from './styles.scss';
import {
  LoginHeader,
  Footer,
  Input,
  FormStatus
} from 'presentation/components';

const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false
  });

  const [errorState] = useState({
    defaultError: '',
    email: 'Required field',
    password: 'Require field'
  });

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ state, errorState }}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Type your e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Type your password"
          />
          <button disabled className={Styles.submit} type="submit">
            Entrar
          </button>
          <span className={Styles.link}>create an account</span>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  );
};

export default Login;
