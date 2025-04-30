import { render } from '@testing-library/react';

import AdmissionModal from './admission-modal';

describe('AdmissionModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdmissionModal />);
    expect(baseElement).toBeTruthy();
  });
});
