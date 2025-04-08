import { render } from '@testing-library/react';

import EditAppoinment from './edit-appoinment';

describe('EditAppoinment', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditAppoinment />);
    expect(baseElement).toBeTruthy();
  });
});
