import { createContext } from "react";

interface NavLinkContextProps {
    navLink?: string;
    setNavLink?: React.Dispatch<React.SetStateAction<string>>;
} 

export const NavLinkContext = createContext<NavLinkContextProps>({});