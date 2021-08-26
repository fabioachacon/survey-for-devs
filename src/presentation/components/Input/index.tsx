import React, { InputHTMLAttributes, useContext, useState } from 'react';
import Styles from './styles.scss';
import Context from 'presentation/contexts/form/form-context';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = ({ name, ...props }: InputProps) => {
  const { state, setState } = useContext(Context);
  const error = state[`${name}Error`];

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false;
  };

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [name]: event.target.value
    });
  };

  return (
    <div className={Styles.inputWrapper}>
      <input
        aria-label={`input-${name}`}
        readOnly
        onFocus={enableInput}
        onChange={handleChange}
        {...props}
      />
      <span
        title={error}
        aria-label={`status-${name}`}
        className={`${Styles.status} ${!!error ? Styles.error : ''}`}
      />
    </div>
  );
};

export default Input;
