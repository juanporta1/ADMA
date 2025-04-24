import { ReactNode } from 'react';
import { AppointmentProvider } from './providers/appointment-provider';
import { ColorProvider } from './providers/color-provider';
import { ApiHostProvider } from './providers/api-host-provider';
import { SelectsDataProvider } from './providers/data-entities-provider';
import { NavLinksProvider } from './providers/nav-links.provider';

interface props {
  children: ReactNode;
}

export function ContextsProvider({ children }: props) {
  return (
    <NavLinksProvider>
      <ApiHostProvider>
        <ColorProvider>
          <SelectsDataProvider>
            <AppointmentProvider>{children}</AppointmentProvider>
          </SelectsDataProvider>
        </ColorProvider>
      </ApiHostProvider>
    </NavLinksProvider>
  );
}
