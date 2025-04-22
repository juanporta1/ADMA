import { render } from '@testing-library/react';

import ColumnsMenu from './columns-menu';

describe('ColumnsMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ColumnsMenu />);
    expect(baseElement).toBeTruthy();
  });
});
