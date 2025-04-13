import { ReactNode } from 'react';
import { NeighborhoodsContext } from '../contexts/neighborhoods-context';

export function NeighborhoodProvider({ children }: {children: ReactNode}) {
  const neighborhoods = [
    'Córdoba',
    'La Perla',
    'Liniers',
    'Parque San Juan',
    'Parque Virrey Este',
    'Portales del Sol',
    'Residencial El Crucero',
    'Sabattini',
    'Sur',
    'Tiro Federal y Piedra del Sapo',
    'Touring',
    'Villa Camiares',
    'General Bustos',
    'Nuevo Amanecer',
    'Villa Oviedo',
    'Parque Virrey Oeste',
    'Lalahenes',
    'San Martín/25 de Mayo',
    'Santa Teresa/Jesús',
    'El Cañito',
    'Pellegrini',
    'Norte',
    'San Juan',
    'Don Bosco',
    'Liniers',
  ];
  return (
    <NeighborhoodsContext.Provider value={neighborhoods}>
      {children}
    </NeighborhoodsContext.Provider>
  );
}
