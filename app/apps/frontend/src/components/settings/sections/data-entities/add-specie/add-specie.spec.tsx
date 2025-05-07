import { render } from '@testing-library/react';

import AddSpecie from './add-specie';

describe('AddSpecie', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddSpecie />);
    expect(baseElement).toBeTruthy();
  });
});
