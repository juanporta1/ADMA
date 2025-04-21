import { render } from '@testing-library/react';

import EditAppoinment from './edit-appointment';

describe('EditAppoinment', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditAppoinment />);
    expect(baseElement).toBeTruthy();
  });
});
