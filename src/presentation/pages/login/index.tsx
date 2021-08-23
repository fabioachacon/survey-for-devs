import React from 'react';

import Styles from './styles.scss';
import Header from 'presentation/components/LoginHeader';
import Footer from 'presentation/components/Footer';
import Spinner from 'presentation/components/Spinner';
import Input from 'presentation/components/Input';

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <Header />
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
        <div className={Styles.errorWrapper}>
          <Spinner className={Styles.spinner} />
          <span className={Styles.error}>Error</span>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default Login;
