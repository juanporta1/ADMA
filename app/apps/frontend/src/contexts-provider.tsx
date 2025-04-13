import { ReactNode } from 'react';
import { AppoinmentProvider } from './providers/appoinment-provider';
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
          <AppoinmentProvider>{children}</AppoinmentProvider>
        </ColorProvider>
      </NeighborhoodProvider>
    </ApiHostProvider>
  );
}
