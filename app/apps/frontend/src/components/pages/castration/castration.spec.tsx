import { render } from '@testing-library/react';

import Castration from './castration';

describe('Castration', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Castration />);
    expect(baseElement).toBeTruthy();
  });
});
