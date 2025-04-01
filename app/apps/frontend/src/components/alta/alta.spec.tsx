import { render } from '@testing-library/react';

import Alta from './alta';

describe('Alta', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Alta />);
    expect(baseElement).toBeTruthy();
  });
});
