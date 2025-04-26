import { render } from '@testing-library/react';

import OidcAuthProvider from './oidc-auth-provider';

describe('OidcAuthProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OidcAuthProvider />);
    expect(baseElement).toBeTruthy();
  });
});
