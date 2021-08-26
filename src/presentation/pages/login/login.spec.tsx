import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Login from '.';
import { Validation } from 'presentation/validation/protocols';

type SutTypes = {
  validationSpy: ValidationSpy;
};

class ValidationSpy implements Validation {
  errorMessage: string;
  input: object;

  validate(input: object) {
    this.input = input;
    return this.errorMessage;
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  return {
    validationSpy
  };
};

describe('<Login />', () => {
  afterEach(cleanup);
  test('should render the input with default state', () => {
    const { validationSpy } = makeSut();
    render(<Login validation={validationSpy} />);

    const spinner = screen.queryByLabelText(/spinner/i);
    expect(spinner).not.toBeInTheDocument();

    const errorMessage = screen.queryByLabelText(/error-message/i);
    expect(errorMessage).not.toBeInTheDocument();

    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toHaveAttribute('disabled');

    const statusLabel = screen.getByLabelText(/status-password/i);
    expect(statusLabel).toHaveClass('error');
  });

  test('should call Validation with correct email', () => {
    const { validationSpy } = makeSut();
    render(<Login validation={validationSpy} />);

    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.input(emailInput, {
      target: {
        value: 'any_email'
      }
    });

    expect(validationSpy.input).toEqual({
      email: 'any_email'
    });
  });

  test('should call Validation with correct password', () => {
    const { validationSpy } = makeSut();
    render(<Login validation={validationSpy} />);

    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.input(passwordInput, {
      target: {
        value: 'any_password'
      }
    });

    expect(validationSpy.input).toEqual({
      password: 'any_password'
    });
  });
});
