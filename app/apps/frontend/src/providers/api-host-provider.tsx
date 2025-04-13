import { ReactNode } from 'react';
import { ApiHostContext } from '../contexts/api-host-context';

interface props {
  children: ReactNode;
}
export function ApiHostProvider({ children }: props) {
   
  const host = "http://localhost:3000/api"
  return (
    <ApiHostContext.Provider value={host}>
      {children}
    </ApiHostContext.Provider>
  );
}
