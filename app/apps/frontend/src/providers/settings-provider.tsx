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
  const [reasons, setReasons] = useState<
    { ID_reason: number; reason: string }[] | null
  >(null);
  const [species, setSpecies] = useState<
    { ID_specie: number; specie: string }[] | null
  >(null);
  
  const settings: Settings = {
    userList: [users, setUsers],
    neighborhoodList: [neighborhoods, setNeighborhoods],
    reasonList: [reasons, setReasons],
    specieList: [species, setSpecies],
  };

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}
