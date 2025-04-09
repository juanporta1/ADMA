import { render } from '@testing-library/react';

import NavLinksContainer from './nav-links-container';

describe('NavLinksContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NavLinksContainer />);
    expect(baseElement).toBeTruthy();
  });
});
