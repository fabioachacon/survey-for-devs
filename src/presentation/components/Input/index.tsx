import React, { InputHTMLAttributes, useContext } from 'react';
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

  const getStatusIndicator = () => {
    return `${Styles.status} ${!!error ? Styles.error : Styles.success}`;
  };

  const getStatusMessage = () => {
    const success = 'Looking good!';
    return error || success;
  };

  return (
    <div className={Styles.inputWrapper}>
      <input
        readOnly
        onFocus={enableInput}
        onChange={handleChange}
        {...props}
      />
      <span
        title={getStatusMessage()}
        className={getStatusIndicator()}
        aria-label={`${name}-status`}
      />
    </div>
  );
};

export default Input;
