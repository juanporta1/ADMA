import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import UseCreateAppoinment from './use-create-appoinment';

describe('UseCreateAppoinment', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => UseCreateAppoinment());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
