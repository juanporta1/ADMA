import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import UseDeleteAppoinment from './use-delete-appoinment';

describe('UseDeleteAppoinment', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => UseDeleteAppoinment());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
