import { render } from '@testing-library/react';

import Abm from './abm';

describe('Abm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Abm />);
    expect(baseElement).toBeTruthy();
  });
});
