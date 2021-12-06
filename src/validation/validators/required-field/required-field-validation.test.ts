import { RequiredFieldError } from 'validation/errors';
import { RequiredFieldValidation } from './required-field-validation';
import faker from 'faker';

const makeSut = () => new RequiredFieldValidation(faker.random.word());

describe('RequiredFieldValidation', () => {
  test('should return if field is empty', () => {
    const sut = makeSut();
    const error = sut.validate('');

    expect(error).toEqual(new RequiredFieldError());
  });

  test('should return falsy if field is not empty', () => {
    const sut = makeSut();
    const error = sut.validate(faker.random.words());

    expect(error).toBeFalsy();
  });
});
