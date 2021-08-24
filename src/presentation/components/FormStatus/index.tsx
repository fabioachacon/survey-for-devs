import React, { useContext } from 'react';
import Spinner from '../Spinner';
import Styles from './styles.scss';

import Context from 'presentation/contexts/form/form-context';

const FormStatus = () => {
  const { isLoading, errorMessage } = useContext(Context);

  return (
    <div className={Styles.errorWrapper}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {errorMessage && (
        <span aria-label="error-message" className={Styles.error}>
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default FormStatus;
