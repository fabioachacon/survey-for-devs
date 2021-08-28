import React, { useState, useEffect } from 'react';

import FormContext from 'presentation/contexts/form/form-context';
import { Validation } from 'presentation/validation/protocols';
import Styles from './styles.scss';
import {
  LoginHeader,
  Footer,
  Input,
  FormStatus
} from 'presentation/components';

export type LoginProps = {
  validation: Validation;
};

const Login = ({ validation }: LoginProps) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    defaultError: '',
    emailError: '',
    passwordError: ''
  });

  useEffect(() => {
    setState({
      ...state,
      emailError: validation?.validate('email', state.email),
      passwordError: validation?.validate('password', state.password)
    });
  }, [state.email, state.password]);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

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
          <button
            disabled={!!(state.emailError || state.passwordError)}
            className={Styles.submit}
            type="submit"
            onClick={handleSubmit}
          >
            Entrar
          </button>
          <span className={Styles.link}>
            Don't have an account? <a>create one</a>
          </span>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  );
};

export default Login;
