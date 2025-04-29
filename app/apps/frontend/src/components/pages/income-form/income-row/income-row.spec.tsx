import { render } from '@testing-library/react';

import IncomeRow from './income-row';

describe('IncomeRow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IncomeRow />);
    expect(baseElement).toBeTruthy();
  });
});
