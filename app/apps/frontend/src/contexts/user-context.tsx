import { createContext, Dispatch, SetStateAction } from "react";

interface UserContextProps {
    currentUser: {ID_user: number, email: string, role: "admin" | "main" | "user"} | null;
    setCurrentUser: Dispatch<SetStateAction<{ID_user: number, email: string, role: "admin" | "main" | "user"} | null>>;
}

export const UserContext = createContext<UserContextProps>({
    currentUser: null,
    setCurrentUser: () => null
});
