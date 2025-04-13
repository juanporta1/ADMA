import { MainColorContext } from '../contexts/color-context';
import { ReactNode, useState } from 'react';

interface props {
  children: ReactNode;
}
export function ColorProvider({ children }: props) {
    const mainColor ="#7e6c88"; 

    return(
        <MainColorContext.Provider value={mainColor}>
            {children}
        </MainColorContext.Provider>
    )
}