import { render } from '@testing-library/react';

import CreateAppoinment from './create-appoinment';

describe('CreateAppoinment', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateAppoinment />);
    expect(baseElement).toBeTruthy();
  });
});
