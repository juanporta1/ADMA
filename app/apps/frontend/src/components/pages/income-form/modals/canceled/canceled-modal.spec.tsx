import { render } from '@testing-library/react';

import CanceledModal from './canceled-modal';

describe('CanceledModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CanceledModal />);
    expect(baseElement).toBeTruthy();
  });
});
