import { createContext, Dispatch, SetStateAction } from "react";

interface UserContextProps {
    user: {ID_user: number, email: string, role: "admin" | "main" | "user"} | null;
    setUser: Dispatch<SetStateAction<{ID_user: number, email: string, role: "admin" | "main" | "user"} | null>>;
}

export const UserContext = createContext<UserContextProps>({
    user: null,
    setUser: () => null
});
