import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import FormContext from 'presentation/contexts/form/form-context';
import Styles from './styles.scss';
import {
  LoginHeader,
  Footer,
  Input,
  FormStatus
} from 'presentation/components';

import { Authentication } from 'domain/usecases';
import { Validation } from 'validation/protocols/validation';

export type LoginProps = {
  validation: Validation;
  authentication: Authentication;
};

const Login = ({ validation, authentication }: LoginProps) => {
  const history = useHistory();
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

  const handleOnSubmit = async (
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
        const account = await authentication?.auth({
          email: state.email,
          password: state.password
        });
        localStorage.setItem('accessToken', account.accessToken);
        history.replace('/');
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
        <form
          className={Styles.form}
          onSubmit={handleOnSubmit}
          aria-label="main-form"
        >
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
            Don't have an account?{' '}
            <Link aria-label="signup" to="/signup">
              create one
            </Link>
          </span>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  );
};

export default Login;
