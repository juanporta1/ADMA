import { ReactNode } from 'react';
import { AppoinmentProvider } from './assets/providers/appoinment-provider';
import { ColorProvider } from './assets/providers/color-provider';
import { NeighborhoodProvider } from './assets/providers/neighborhood-provider';

interface props {
  children: ReactNode;
}

export function ContextsProvider({ children }: props) {
  return (
    <NeighborhoodProvider>
      <ColorProvider>
        <AppoinmentProvider>{children}</AppoinmentProvider>
      </ColorProvider>
    </NeighborhoodProvider>
  );
}
