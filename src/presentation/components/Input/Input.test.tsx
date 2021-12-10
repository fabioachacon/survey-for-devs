import React from 'react';
import faker from 'faker';
import {
  render,
  RenderResult,
  screen,
  fireEvent
} from '@testing-library/react';
import Input from '.';
import Context from 'presentation/contexts/form/form-context';

const makeSut = (fieldName: string): RenderResult => {
  const inputComponent = (
    <Context.Provider value={{ state: {} }}>
      <Input name={fieldName} />
    </Context.Provider>
  );

  return render(inputComponent);
};

describe('Input Component', () => {
  test('Should begin with readOnly', () => {
    const field = faker.database.column();
    makeSut(field);

    const input = screen.getByLabelText(field) as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });

  test('Should remove readOnly on focus', () => {
    const field = faker.database.column();

    makeSut(field);

    const input = screen.getByLabelText(field) as HTMLInputElement;
    fireEvent.focus(input);
    expect(input.readOnly).toBe(false);
  });
});
