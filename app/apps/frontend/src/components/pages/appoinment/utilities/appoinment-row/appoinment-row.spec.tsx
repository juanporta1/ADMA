import { render } from '@testing-library/react';

import AppoinmentRow from './appoinment-row';

describe('AppoinmentRow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppoinmentRow />);
    expect(baseElement).toBeTruthy();
  });
});
