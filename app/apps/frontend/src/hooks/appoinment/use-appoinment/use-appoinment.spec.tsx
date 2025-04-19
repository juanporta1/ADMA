import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import UseAppoinment from './use-appoinment';

describe('UseAppoinment', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => UseAppoinment());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
