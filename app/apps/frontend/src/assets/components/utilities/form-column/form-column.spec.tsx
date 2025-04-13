import { render } from '@testing-library/react';

import FormColumn from './form-column';

describe('FormColumn', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormColumn />);
    expect(baseElement).toBeTruthy();
  });
});
