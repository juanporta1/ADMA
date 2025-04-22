import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import UseDataEntities from './use-data-entities';

describe('UseDataEntities', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => UseDataEntities());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
