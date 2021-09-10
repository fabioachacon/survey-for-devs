import { InvalidFieldError } from 'validation/errors';
import { FieldValidation } from 'validation/protocols/field-validation';

export class MinLengthValidation implements FieldValidation {
  constructor(readonly field: string, private readonly minLenth: number) {}

  validate(value: string): Error {
    return new InvalidFieldError();
  }
}