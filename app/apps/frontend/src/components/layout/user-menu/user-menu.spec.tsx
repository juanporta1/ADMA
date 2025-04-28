import { render } from '@testing-library/react';

import UserMenu from './user-menu';

describe('UserMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserMenu />);
    expect(baseElement).toBeTruthy();
  });
});
