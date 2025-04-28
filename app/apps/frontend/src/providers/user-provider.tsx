import { ReactNode, useEffect, useState } from 'react';
import { UserContext } from '../contexts/user-context';

interface props {
    children: ReactNode;
}
export function UserProvider({ children }: props) {

    const [currentUser, setCurrentUser] = useState<{ ID_user: number, email: string, role: "admin" | "main" | "user" } | null>(null);

    useEffect(() => {
        const user = localStorage.getItem("currentUser");
        if (user)
            setCurrentUser(JSON.parse(user) || null)
    }, [])
    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    )
}