import React from 'react';
import { render, screen } from '@testing-library/react';
import Input from '.';
import Context from 'presentation/contexts/form/form-context';

describe('Input Component', () => {
  test('Should begin with readOnly', () => {
    const inputComponent = (
      <Context.Provider value={{ state: {} }}>
        <Input name="field" />
      </Context.Provider>
    );

    render(inputComponent);

    const input = screen.getByLabelText('input-field') as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });
});
