import { ReactNode, useState } from 'react';
import { UserContext } from '../contexts/user-context';

interface props {
  children: ReactNode;
}
export function UserProvider({ children }: props) {
  
    const [user, setUser] = useState<{ID_user: number, email: string, role: "admin" | "main" | "user"} | null>(null);
    return(
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}