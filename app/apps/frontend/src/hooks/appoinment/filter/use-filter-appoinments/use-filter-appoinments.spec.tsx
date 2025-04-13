import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import UseFilterAppoinments from './use-filter-appoinments';

describe('UseFilterAppoinments', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => UseFilterAppoinments());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
