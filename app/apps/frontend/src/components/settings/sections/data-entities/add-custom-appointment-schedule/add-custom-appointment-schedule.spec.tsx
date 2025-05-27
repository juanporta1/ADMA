import { render } from '@testing-library/react';

import AddCustomAppointmentSchedule from './add-custom-appointment-schedule';

describe('AddCustomAppointmentSchedule', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddCustomAppointmentSchedule />);
    expect(baseElement).toBeTruthy();
  });
});
