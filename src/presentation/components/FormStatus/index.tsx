import React from 'react';
import Spinner from '../Spinner';
import Styles from './styles.scss';

const FormStatus = () => {
  return (
    <div className={Styles.errorWrapper}>
      <Spinner className={Styles.spinner} />
      <span className={Styles.error}>Error</span>
    </div>
  );
};

export default FormStatus;
