import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import UseSelectsData from './use-selects-data';

describe('UseSelectsData', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => UseSelectsData());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
