import { render } from '@testing-library/react';

import StatusTable from './status-table';

describe('StatusTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StatusTable />);
    expect(baseElement).toBeTruthy();
  });
});
