import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useGetLoadingText from './get-loading-text';

describe('useGetLoadingText', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useGetLoadingText());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
