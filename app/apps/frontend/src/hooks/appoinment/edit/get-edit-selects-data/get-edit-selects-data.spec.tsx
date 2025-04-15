import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useGetEditSelectsData from './get-edit-selects-data';

describe('useGetEditSelectsData', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useGetEditSelectsData());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
