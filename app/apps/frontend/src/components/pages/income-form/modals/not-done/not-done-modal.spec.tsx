import { render } from '@testing-library/react';

import NotDoneModal from './not-done-modal';

describe('NotDoneModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NotDoneModal />);
    expect(baseElement).toBeTruthy();
  });
});
