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

    const errorMessage = screen.queryByLabelText(/error-message/);
    expect(errorMessage).not.toBeInTheDocument();
  });
});
