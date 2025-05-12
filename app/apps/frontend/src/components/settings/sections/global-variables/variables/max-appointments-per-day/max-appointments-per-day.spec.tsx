import { render } from '@testing-library/react';

import MaxAppointmentsPerDay from './max-appointments-per-day';

describe('MaxAppointmentsPerDay', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MaxAppointmentsPerDay />);
    expect(baseElement).toBeTruthy();
  });
});
