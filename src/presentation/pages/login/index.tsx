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
import { Authentication } from 'domain/usecases';

export type LoginProps = {
  validation: Validation;
  authentication: Authentication;
};

const Login = ({ validation, authentication }: LoginProps) => {
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

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      if (state.isLoading) {
        return;
      }
      setState({
        ...state,
        isLoading: true
      });
      if (!(state.emailError || state.passwordError)) {
        await authentication?.auth({
          email: state.email,
          password: state.password
        });
      }
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        defaultError: error.message
      });
    }
  };

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form className={Styles.form} onSubmit={handleSubmit}>
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
