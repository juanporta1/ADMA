import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import UseSettings from './use-settings';

describe('UseSettings', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => UseSettings());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
