import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '.';

describe('<Login />', () => {
  test('should not render the spinner when isLoading state is false', () => {
    render(<Login />);

    const spinner = screen.queryByLabelText(/spinner/i);
    expect(spinner).not.toBeInTheDocument();
  });

  test('should not render error message when there is no error', () => {
    render(<Login />);

    const errorMessage = screen.queryByLabelText(/error-message/i);
    expect(errorMessage).not.toBeInTheDocument();
  });

  test('should render a disabled button', () => {
    render(<Login />);

    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toHaveAttribute('disabled');
  });

  test('should render an error indicator', () => {
    render(<Login />);

    const statusLabel = screen.getByLabelText(/status-password/i);
    expect(statusLabel).toHaveClass('error');
  });
});
