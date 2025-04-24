import { useState } from "react";
import { NavLinkContext } from "../contexts/nav-link.context";


export function NavLinksProvider({children}: {children: React.ReactNode}) {
    const [navLink, setNavLink] = useState<string>("");

    return(
        <NavLinkContext.Provider value={{navLink, setNavLink}}>
            {children}
        </NavLinkContext.Provider>
    )
}