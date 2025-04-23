import { render } from '@testing-library/react';

import IncomeForm from './income-form';

describe('IncomeForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IncomeForm />);
    expect(baseElement).toBeTruthy();
  });
});
