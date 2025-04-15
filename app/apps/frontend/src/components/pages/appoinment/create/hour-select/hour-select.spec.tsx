import { render } from '@testing-library/react';

import HourSelect from './hour-select';

describe('HourSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HourSelect />);
    expect(baseElement).toBeTruthy();
  });
});
