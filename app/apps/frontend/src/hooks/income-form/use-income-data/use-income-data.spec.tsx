import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import UseIncomeData from './use-income-data';

describe('UseIncomeData', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => UseIncomeData());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
