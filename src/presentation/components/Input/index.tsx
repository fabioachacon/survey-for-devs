import React from 'react';
import Styles from './styles.scss';

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input = (props: InputProps) => {
  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false;
  };

  return (
    <div className={Styles.inputWrapper}>
      <input readOnly onFocus={enableInput} {...props} />
      <span className={Styles.status}></span>
    </div>
  );
};

export default Input;
