import React from 'react';
import Styles from './styles.scss';

type SpinnerProps = React.HTMLAttributes<HTMLElement>;

const Spinner = (props: SpinnerProps) => {
  return (
    <div
      {...props}
      aria-label="spinner"
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
