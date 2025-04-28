import { WebStorageStateStore } from 'oidc-client-ts';
import { AuthProvider } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';

const clientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const callback = import.meta.env.VITE_GOOGLE_CALLBACK_URL_FRONTEND;
const secret = import.meta.env.VITE_GOOGLE_SECRET;


const oidcConfig = {
  authority: 'https://accounts.google.com',
  client_id: clientID,
  redirect_uri: callback,
  response_type: 'code',
  scope: 'openid email profile',
  client_secret: secret,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  
};

export function OidcAuthProvider({ children }: { children: React.ReactNode }) {

  return <AuthProvider {...oidcConfig}>{children}</AuthProvider>;
}

export default OidcAuthProvider;
