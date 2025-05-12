import { createContext, Dispatch, SetStateAction } from 'react';
import { User } from '../hooks/general/login/use-login';
import { Neighborhood, Reason, Specie } from '../types/data-entities.types';

export interface Settings {
  userList: [User[] | null, Dispatch<SetStateAction<User[] | null>>];
  neighborhoodList: [
    Neighborhood[] | null,
    Dispatch<SetStateAction<Neighborhood[] | null>>
  ];
  reasonList: [Reason[] | null, Dispatch<SetStateAction<Reason[] | null>>];
  specieList: [Specie[] | null, Dispatch<SetStateAction<Specie[] | null>>];
  maxAppointmentsPerDayList: [
    number | null,
    Dispatch<SetStateAction<number | null>>
  ];
}
export const SettingsContext = createContext<Settings>({} as Settings);
