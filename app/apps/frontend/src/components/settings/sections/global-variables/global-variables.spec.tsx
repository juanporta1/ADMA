import { render } from '@testing-library/react';

import GlobalVariables from './global-variables';

describe('GlobalVariables', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GlobalVariables />);
    expect(baseElement).toBeTruthy();
  });
});
