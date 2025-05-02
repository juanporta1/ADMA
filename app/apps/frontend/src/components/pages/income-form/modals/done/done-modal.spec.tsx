import { render } from '@testing-library/react';

import DoneModal from './done-modal';

describe('DoneModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DoneModal />);
    expect(baseElement).toBeTruthy();
  });
});
