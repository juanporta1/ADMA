import { render } from '@testing-library/react';

import Sesion from './sesion';

describe('Sesion', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Sesion />);
    expect(baseElement).toBeTruthy();
  });
});
