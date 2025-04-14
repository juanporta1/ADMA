import { render } from '@testing-library/react';

import DeleteModal from './delete-modal';

describe('DeleteModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DeleteModal />);
    expect(baseElement).toBeTruthy();
  });
});
