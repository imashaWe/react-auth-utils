import { render } from '@testing-library/react';
import { AuthProvider } from '../..';
import React from 'react';

describe('AuthProvider', () => {
  it('should render correctly with children', () => {
    const { getByText } = render(
      <AuthProvider>
        <div>This is children</div>
      </AuthProvider>
    );

    expect(getByText('This is children')).toBeTruthy();
  });
});
