import { ReactNode } from 'react';
import { AppointmentProvider } from './providers/appointment-provider';
import { ColorProvider } from './providers/color-provider';
import { NeighborhoodProvider } from './providers/neighborhood-provider';
import { ApiHostProvider } from './providers/api-host-provider';

interface props {
  children: ReactNode;
}

export function ContextsProvider({ children }: props) {
  return (
    <ApiHostProvider>
      <NeighborhoodProvider>
        <ColorProvider>
          <AppointmentProvider>{children}</AppointmentProvider>
        </ColorProvider>
      </NeighborhoodProvider>
    </ApiHostProvider>
  );
}
