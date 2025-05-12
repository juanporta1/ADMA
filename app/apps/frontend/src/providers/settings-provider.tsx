import { ReactNode, useState } from 'react';
import { SettingsContext, Settings } from '../contexts/settings-context';
import { User } from '../hooks/general/login/use-login';
import {
  Neighborhood,
  Reason,
  Specie,
} from '../types/data-entities.types';

interface props {
  children: ReactNode;
}
export function SettingsProvider({ children }: props) {
  const [users, setUsers] = useState<User[] | null>(null);
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[] | null>(
    null
  );
  const [reasons, setReasons] = useState<Reason[] | null>(null);
  const [species, setSpecies] = useState<Specie[] | null>(null);
  const [maxAppointmentsPerDay, setMaxAppointmentsPerDay] = useState<
    number | null
  >(null);
  const settings: Settings = {
    userList: [users, setUsers],
    neighborhoodList: [neighborhoods, setNeighborhoods],
    reasonList: [reasons, setReasons],
    specieList: [species, setSpecies],
    maxAppointmentsPerDayList: [maxAppointmentsPerDay, setMaxAppointmentsPerDay],
  };

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}
