import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import UseEditForm from './use-edit-form';

describe('UseEditForm', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => UseEditForm());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
