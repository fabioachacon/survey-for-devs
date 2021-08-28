import React from 'react';
import faker from 'faker';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Login from '.';
import { ValidationStub } from 'presentation/test/mock-validation';

type SutTypes = {
  validationStub: ValidationStub;
};

const makeSut = (error: string | null = null): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = error;

  render(<Login validation={validationStub} />);

  return {
    validationStub
  };
};

describe('<Login />', () => {
  afterEach(cleanup);

  test('should render the input with default state', () => {
    const error = faker.random.words();
    makeSut(error);

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

  test('should show email error if Validations fails', () => {
    const error = faker.random.words();
    const { validationStub } = makeSut(error);

    const mockEmail = faker.internet.email();
    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.input(emailInput, {
      target: {
        value: mockEmail
      }
    });

    const emailStatus = screen.getByLabelText('email-status');
    expect(emailStatus).toHaveAttribute('title', validationStub.errorMessage);
    expect(emailStatus).toHaveClass('error');
  });

  test('should show valid email indicator if Validation succeeds', () => {
    makeSut();

    const mockEmail = faker.internet.email();
    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.input(emailInput, {
      target: {
        value: mockEmail
      }
    });

    const emailStatus = screen.getByLabelText('email-status');
    expect(emailStatus).toHaveAttribute('title', 'Looking good!');
    expect(emailStatus).toHaveClass('success');
  });

  test('should show valid password indicator if Validation succeeds', () => {
    makeSut();

    const mockPassword = faker.internet.password();
    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.input(passwordInput, {
      target: {
        value: mockPassword
      }
    });

    const emailStatus = screen.getByLabelText('password-status');
    expect(emailStatus).toHaveAttribute('title', 'Looking good!');
    expect(emailStatus).toHaveClass('success');
  });

  test('should enable submit button if the form has valid inputs', () => {
    makeSut();

    const mockEmail = faker.internet.email();
    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.input(emailInput, {
      target: {
        value: mockEmail
      }
    });

    const mockPassword = faker.internet.password();
    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.input(passwordInput, {
      target: {
        value: mockPassword
      }
    });

    const submitButton = screen.getByRole('button', { name: /entrar/i });
    expect(submitButton).toBeEnabled();
  });
});
