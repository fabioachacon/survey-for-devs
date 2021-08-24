import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '.';

describe('<Login />', () => {
  test('should render a heading', () => {
    render(<Login />);
  });
});
