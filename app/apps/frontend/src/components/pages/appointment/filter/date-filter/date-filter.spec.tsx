import { render } from '@testing-library/react';

import DateFilter from './date-filter';

describe('DateFilter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DateFilter />);
    expect(baseElement).toBeTruthy();
  });
});
