import React, { useContext } from 'react';
import Spinner from '../Spinner';
import Styles from './styles.scss';

import Context from 'presentation/contexts/form/form-context';

const FormStatus = () => {
  const {
    state: { isLoading, defaultError }
  } = useContext(Context);

  return (
    <div className={Styles.errorWrapper}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {defaultError && (
        <span aria-label="error-message" className={Styles.error}>
          {defaultError}
        </span>
      )}
    </div>
  );
};

export default FormStatus;
