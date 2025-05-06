import { ReactNode, useState } from 'react';
import { SettingsContext, Settings} from '../contexts/settings-context';
import { User } from '../hooks/general/login/use-login';

interface props {
  children: ReactNode;
}
export function SettingsProvider({ children }: props) {
   const [users, setUsers] = useState<User[] | null>(null);

   const settings: Settings = {
      userList: [users, setUsers]
   }
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}
