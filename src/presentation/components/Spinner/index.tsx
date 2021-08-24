import React from 'react';
import Styles from './styles.scss';

type SpinnerProps = React.HTMLAttributes<HTMLElement>;

const Spinner = (props: SpinnerProps) => {
  return (
    <div
      aria-label="spinner"
      {...props}
      className={[Styles.spinner, props.className].join(' ')}
    >
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default Spinner;
