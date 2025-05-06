import { createContext, Dispatch, SetStateAction } from "react";
import { User } from "../hooks/general/login/use-login";


export interface Settings{
    userList: [User[] | null, Dispatch<SetStateAction<User[] | null>>];
}
export const SettingsContext = createContext<Settings>({} as Settings);
