import React, { InputHTMLAttributes, useContext } from 'react';
import Styles from './styles.scss';
import Context from 'presentation/contexts/form/form-context';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = ({ name, ...props }: InputProps) => {
  const { state, errorState } = useContext(Context);
  const error = errorState[`${name}`];

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false;
  };

  const getTitle = () => {
    return error;
  };

  return (
    <div className={Styles.inputWrapper}>
      <input readOnly onFocus={enableInput} {...props} />
      <span
        title={getTitle()}
        aria-label={`status-${name}`}
        className={`${Styles.status} ${!!error ? Styles.error : ''}`}
      />
    </div>
  );
};

export default Input;
