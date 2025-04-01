import { render } from '@testing-library/react';

import Baja from './baja';

describe('Baja', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Baja />);
    expect(baseElement).toBeTruthy();
  });
});
