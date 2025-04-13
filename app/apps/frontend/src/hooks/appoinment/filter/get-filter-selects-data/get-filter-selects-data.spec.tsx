import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useGetFilterSelectsData from './get-filter-selects-data';

describe('useGetFilterSelectsData', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useGetFilterSelectsData());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
