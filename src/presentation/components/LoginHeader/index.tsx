import React, { memo } from 'react';

import Styles from './styles.scss';
import Logo from '../Logo';

const LoginHeader = () => {
  return (
    <header className={Styles.header}>
      <Logo />
      <h1>4Dev - Survey for Programmers</h1>
    </header>
  );
};

/**
 * The memo function prevents the component from being re-rendered
 * in case a parent component suffers a state update.
 */
export default memo(LoginHeader);
