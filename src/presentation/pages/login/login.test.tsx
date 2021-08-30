import React from 'react';
import faker from 'faker';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

import Login from '.';
import { ValidationStub } from 'presentation/test/mock-validation';
import { AuthenticationSpy } from 'presentation/test/mock-authentication';

type SutTypes = {
  validationStub: ValidationStub;
  authenticationSpy: AuthenticationSpy;
};

const makeSut = (validationError?: string): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  validationStub.errorMessage = validationError;
  render(
    <Login validation={validationStub} authentication={authenticationSpy} />
  );

  return {
    validationStub,
    authenticationSpy
  };
};

const inputEmail = () => {
  const mockEmail = faker.internet.email();
  const emailInput = screen.getByPlaceholderText('Email');
  fireEvent.input(emailInput, {
    target: {
      value: mockEmail
    }
  });
  return mockEmail;
};

const inputPassword = () => {
  const mockPassword = faker.internet.password();
  const passwordInput = screen.getByPlaceholderText('Password');
  fireEvent.input(passwordInput, {
    target: {
      value: mockPassword
    }
  });
  return mockPassword;
};

const inputEmailAndPassword = () => {
  const mockEmail = inputEmail();
  const mockPassword = inputPassword();
  return {
    mockEmail,
    mockPassword
  };
};

describe('<Login />', () => {
  afterEach(cleanup);

  test('should render the input with default state', () => {
    const validationError = faker.random.words();
    makeSut(validationError);

    const spinner = screen.queryByLabelText(/spinner/i);
    expect(spinner).not.toBeInTheDocument();

    const errorMessage = screen.queryByLabelText(/error-message/i);
    expect(errorMessage).not.toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: /entrar/i });
    expect(submitButton).toBeDisabled();

    const passwordStatusLabel = screen.getByLabelText(/password-status/i);
    expect(passwordStatusLabel).toHaveClass('error');

    const emailStatusLabel = screen.getByLabelText(/email-status/i);
    expect(emailStatusLabel).toHaveClass('error');
  });

  test('should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    const { validationStub } = makeSut(validationError);

    inputEmail();
    const emailStatus = screen.getByLabelText('email-status');
    expect(emailStatus).toHaveAttribute('title', validationStub.errorMessage);
    expect(emailStatus).toHaveClass('error');
  });

  test('should show valid email indicator if Validation succeeds', () => {
    makeSut();

    inputEmail();
    const emailStatus = screen.getByLabelText('email-status');
    expect(emailStatus).toHaveAttribute('title', 'Looking good!');
    expect(emailStatus).toHaveClass('success');
  });

  test('should show valid password indicator if Validation succeeds', () => {
    makeSut();

    inputPassword();
    const emailStatus = screen.getByLabelText('password-status');
    expect(emailStatus).toHaveAttribute('title', 'Looking good!');
    expect(emailStatus).toHaveClass('success');
  });

  test('should enable submit button if the form has valid inputs', () => {
    makeSut();

    inputEmailAndPassword();
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    expect(submitButton).toBeEnabled();
  });

  test('should show spinner on submit', () => {
    makeSut();

    inputEmailAndPassword();
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    fireEvent.click(submitButton);

    const spinner = screen.queryByLabelText(/spinner/i);
    expect(spinner).toBeInTheDocument();
  });

  test('should call Authentication with correct values', () => {
    const { authenticationSpy } = makeSut();

    const { mockEmail, mockPassword } = inputEmailAndPassword();
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    fireEvent.click(submitButton);
    expect(authenticationSpy.params).toEqual({
      email: mockEmail,
      password: mockPassword
    });
  });
});
