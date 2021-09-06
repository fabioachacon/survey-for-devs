import { render, screen } from '@testing-library/react';
import { RequiredFieldError } from 'validation/errors';
import { RequiredFieldValidation } from './required-field-validation';
import faker from 'faker';

describe('RequiredFieldValidation', () => {
  test('should return if field is empty', () => {
    const sut = new RequiredFieldValidation('');
    const error = sut.validate('');

    expect(error).toEqual(new RequiredFieldError());
  });

  test('should return falsy if field is not empty', () => {
    const sut = new RequiredFieldValidation('');
    const error = sut.validate(faker.random.words());

    expect(error).toBeFalsy();
  });
});
