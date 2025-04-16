import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import UseEditAppoinment from './use-edit-appoinment';

describe('UseEditAppoinment', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => UseEditAppoinment());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
