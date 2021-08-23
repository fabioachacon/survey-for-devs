import React from 'react';
import Styles from './styles.scss';

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input = (props: InputProps) => {
  return (
    <div className={Styles.inputWrapper}>
      <input {...props} />
      <span className={Styles.status}></span>
    </div>
  );
};

export default Input;
