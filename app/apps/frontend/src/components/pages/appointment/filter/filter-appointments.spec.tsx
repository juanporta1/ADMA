import { render } from '@testing-library/react';

import FilterAppoinments from './filter-appointments';

describe('FilterAppoinments', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FilterAppoinments />);
    expect(baseElement).toBeTruthy();
  });
});
