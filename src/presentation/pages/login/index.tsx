import React, { useState, useEffect } from 'react';
import FormContext from 'presentation/contexts/form/form-context';

import Styles from './styles.scss';
import {
  LoginHeader,
  Footer,
  Input,
  FormStatus
} from 'presentation/components';
import { Validation } from 'presentation/validation/protocols';

export type LoginProps = {
  validation: Validation;
};

const Login = ({ validation }: LoginProps) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    defaultError: '',
    emailError: 'Required field',
    passwordError: 'Required field'
  });

  useEffect(() => {
    validation?.validate({ email: state.email });
  }, [state.email]);

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input
            type="email"
            aria-label="email"
            name="email"
            placeholder="Email"
          />
          <Input type="password" name="password" placeholder="Password" />
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
