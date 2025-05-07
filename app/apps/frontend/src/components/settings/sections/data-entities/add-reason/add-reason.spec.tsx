import { render } from '@testing-library/react';

import AddReason from './add-reason';

describe('AddReason', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddReason />);
    expect(baseElement).toBeTruthy();
  });
});
