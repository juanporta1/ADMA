import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import UseCreateForm from './use-create-form';

describe('UseCreateForm', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => UseCreateForm());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
