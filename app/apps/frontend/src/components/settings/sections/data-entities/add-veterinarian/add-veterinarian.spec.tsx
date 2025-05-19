import { render } from '@testing-library/react';

import AddVeterinarian from './add-veterinarian';

describe('AddVeterinarian', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddVeterinarian />);
    expect(baseElement).toBeTruthy();
  });
});
