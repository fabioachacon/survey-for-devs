import React from 'react';
import faker from 'faker';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Login from '.';
import { ValidationStub } from 'presentation/test/mock-validation';

type SutTypes = {
  validationStub: ValidationStub;
};

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const error = faker.random.words();
  validationStub.errorMessage = error;

  render(<Login validation={validationStub} />);

  return {
    validationStub
  };
};

describe('<Login />', () => {
  afterEach(cleanup);

  test('should render the input with default state', () => {
    const { validationStub } = makeSut();

    const spinner = screen.queryByLabelText(/spinner/i);
    expect(spinner).not.toBeInTheDocument();

    const errorMessage = screen.queryByLabelText(/error-message/i);
    expect(errorMessage).not.toBeInTheDocument();

    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toHaveAttribute('disabled');

    const passwordStatusLabel = screen.getByLabelText(/password-status/i);
    expect(passwordStatusLabel).toHaveClass('error');

    const emailStatusLabel = screen.getByLabelText(/email-status/i);
    expect(emailStatusLabel).toHaveClass('error');
  });

  test('should show email error if Validations fails', () => {
    const { validationStub } = makeSut();
    const errorMessage = faker.random.words();
    validationStub.errorMessage = errorMessage;

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

  test('should show valid Email indicator if Validation succeeds', () => {
    const { validationStub } = makeSut();
    const errorMessage = null;
    validationStub.errorMessage = errorMessage;

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
});
