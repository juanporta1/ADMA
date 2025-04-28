import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import UseLogin from './use-login';

describe('UseLogin', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => UseLogin());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
