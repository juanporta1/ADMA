import { render } from '@testing-library/react';

import AddNeighborhood from './add-neighborhood';

describe('AddNeighborhood', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddNeighborhood />);
    expect(baseElement).toBeTruthy();
  });
});
