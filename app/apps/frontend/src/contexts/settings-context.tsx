import { createContext, Dispatch, SetStateAction } from 'react';
import { User } from '../hooks/general/login/use-login';

export interface Settings {
  userList: [User[] | null, Dispatch<SetStateAction<User[] | null>>];
  neighborhoodList: [
    { ID_neighborhood: number; neighborhood: string }[] | null,
    Dispatch<
      SetStateAction<{ ID_neighborhood: number; neighborhood: string }[] | null>
    >
  ];
  reasonList: [
    { ID_reason: number; reason: string }[] | null,
    Dispatch<SetStateAction<{ ID_reason: number; reason: string }[] | null>>
  ];
  specieList: [
    { ID_specie: number; specie: string }[] | null,
    Dispatch<SetStateAction<{ ID_specie: number; specie: string }[] | null>>
  ];
}
export const SettingsContext = createContext<Settings>({} as Settings);
