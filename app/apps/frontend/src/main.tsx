import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { BrowserRouter } from 'react-router-dom';
import { Accordion, createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import { Notifications } from '@mantine/notifications';
import { DatesProvider } from '@mantine/dates';
import { ContextsProvider } from './contexts-provider';
import OidcAuthProvider from './auth/oidc-auth-provider';
import { PrimeReactProvider } from 'primereact/api';

import 'primereact/resources/themes/lara-light-cyan/theme.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <OidcAuthProvider>
      <ContextsProvider>
        <MantineProvider>
          <PrimeReactProvider>
            <DatesProvider
              settings={{
                locale: 'es',
                firstDayOfWeek: 0,
                weekendDays: [0, 6],
                timezone: 'America/Argentina/Buenos_Aires',
              }}
            >
              <Notifications />
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </DatesProvider>
          </PrimeReactProvider>
        </MantineProvider>
      </ContextsProvider>
    </OidcAuthProvider>
  </StrictMode>
);
