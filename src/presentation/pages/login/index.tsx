import React from 'react';

import Styles from './styles.scss';
import {
  LoginHeader,
  Footer,
  Input,
  FormStatus
} from 'presentation/components';

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader />
      <form className={Styles.form}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Type your e-mail" />
        <Input
          type="password"
          name="password"
          placeholder="Type your password"
        />
        <button className={Styles.submit} type="submit">
          Entrar
        </button>
        <span className={Styles.link}>create an account</span>
        <FormStatus />
      </form>
      <Footer />
    </div>
  );
};

export default Login;
