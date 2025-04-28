import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import UseIncomeForm from './use-income-form';

describe('UseIncomeForm', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => UseIncomeForm());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
