import { FieldValidation } from 'validation/protocols/field-validation';
import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation
} from 'validation/validators';

/**
 * A class with a private constructor cannot be used to create
 * objects with the `new` keyword, outside the class scope.
 * Instances of this class can only be created inside the class body.
 */

export class ValidationBuilder {
  private constructor(
    private readonly fieldName: string,
    private readonly validations: FieldValidation[]
  ) {}

  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, []);
  }

  required(): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName));
    return this;
  }

  email(): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldName));
    return this;
  }

  minLength(length: number): ValidationBuilder {
    this.validations.push(new MinLengthValidation(this.fieldName, length));
    return this;
  }

  build(): FieldValidation[] {
    return this.validations;
  }
}
