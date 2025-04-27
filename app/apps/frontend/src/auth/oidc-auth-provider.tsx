import styles from './oidc-auth-provider.module.css';
import { AuthProvider } from 'react-oidc-context';

const clientID = import.meta.env.GOOGLE_CLIENT_ID;

const oidcConfig = {
  authority: 'https://accounts.google.com',
  client_id: clientID,
  redirect_uri: 'http://localhost',
  response_type: 'code',
  scope: 'openid email profile',
};

export function OidcAuthProvider({ children }: { children: React.ReactNode }) {
  return <AuthProvider {...oidcConfig}>{children}</AuthProvider>;
}

export default OidcAuthProvider;
