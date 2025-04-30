import { render } from '@testing-library/react';

import AbsenceModal from './absence-modal';

describe('AbsenceModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AbsenceModal />);
    expect(baseElement).toBeTruthy();
  });
});
