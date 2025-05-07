import { ReactNode, useState } from 'react';
import { SettingsContext, Settings } from '../contexts/settings-context';
import { User } from '../hooks/general/login/use-login';

interface props {
  children: ReactNode;
}
export function SettingsProvider({ children }: props) {
  const [users, setUsers] = useState<User[] | null>(null);
  const [neighborhoods, setNeighborhoods] = useState<
    { ID_neighborhood: number; neighborhood: string }[] | null
  >(null);
  
  const settings: Settings = {
    userList: [users, setUsers],
    neighborhoodList: [neighborhoods, setNeighborhoods],
  };
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}
