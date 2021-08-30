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

const populateEmailField = () => {
  const mockEmail = faker.internet.email();
  const emailInput = screen.getByPlaceholderText('Email');
  fireEvent.input(emailInput, {
    target: {
      value: mockEmail
    }
  });
  return mockEmail;
};

const populatePasswordField = () => {
  const mockPassword = faker.internet.password();
  const passwordInput = screen.getByPlaceholderText('Password');
  fireEvent.input(passwordInput, {
    target: {
      value: mockPassword
    }
  });
  return mockPassword;
};

const populateEmailAndPasswordFields = () => {
  const mockEmail = populateEmailField();
  const mockPassword = populatePasswordField();
  return {
    mockEmail,
    mockPassword
  };
};

const simulateValidSubmit = () => {
  const submitButton = screen.getByRole('button', { name: /entrar/i });
  fireEvent.click(submitButton);
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

    populateEmailField();
    const emailStatus = screen.getByLabelText('email-status');
    expect(emailStatus).toHaveAttribute('title', validationStub.errorMessage);
    expect(emailStatus).toHaveClass('error');
  });

  test('should show valid email indicator if Validation succeeds', () => {
    makeSut();

    populateEmailField();
    const emailStatus = screen.getByLabelText('email-status');
    expect(emailStatus).toHaveAttribute('title', 'Looking good!');
    expect(emailStatus).toHaveClass('success');
  });

  test('should show valid password indicator if Validation succeeds', () => {
    makeSut();

    populatePasswordField();
    const emailStatus = screen.getByLabelText('password-status');
    expect(emailStatus).toHaveAttribute('title', 'Looking good!');
    expect(emailStatus).toHaveClass('success');
  });

  test('should enable submit button if the form has valid inputs', () => {
    makeSut();

    populateEmailAndPasswordFields();
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    expect(submitButton).toBeEnabled();
  });

  test('should show spinner on submit', () => {
    makeSut();

    populateEmailAndPasswordFields();
    simulateValidSubmit();

    const spinner = screen.queryByLabelText(/spinner/i);
    expect(spinner).toBeInTheDocument();
  });

  test('should call Authentication with correct values', () => {
    const { authenticationSpy } = makeSut();

    const { mockEmail, mockPassword } = populateEmailAndPasswordFields();
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    fireEvent.click(submitButton);
    expect(authenticationSpy.params).toEqual({
      email: mockEmail,
      password: mockPassword
    });
  });

  test('should call Authentication only once', () => {
    const { authenticationSpy } = makeSut();
    authenticationSpy.auth = jest.fn(authenticationSpy.auth);

    const submitButton = screen.getByRole('button', { name: /entrar/i });
    fireEvent.submit(submitButton);
    fireEvent.submit(submitButton);
    expect(authenticationSpy.auth).not.toHaveBeenCalledTimes(2);
  });

  test('should not call auth method if form fields are invalid', () => {
    const validationError = faker.random.words();
    const { authenticationSpy } = makeSut(validationError);
    authenticationSpy.auth = jest.fn(authenticationSpy.auth);

    populateEmailField();
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    fireEvent.submit(submitButton);
    expect(authenticationSpy.auth).toHaveBeenCalledTimes(0);
  });
});
