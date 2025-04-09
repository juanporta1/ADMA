import { ReactNode } from 'react';
import { AppoinmentProvider } from './assets/providers/appoinment-provider';
import { ColorProvider } from './assets/providers/color-provider';

interface props {
  children: ReactNode;
}

export function ContextsProvider({ children }: props) {
  return (
    <ColorProvider>
      <AppoinmentProvider>{children}</AppoinmentProvider>
    </ColorProvider>
  );
}
