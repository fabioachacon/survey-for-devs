export class RequiredFieldError extends Error {
  constructor() {
    super('Required field');
    this.name = 'RequiredFieldError';
  }
}
export class InvalidFieldError extends Error {
  constructor() {
    super('Invalid Field');
  }
}
