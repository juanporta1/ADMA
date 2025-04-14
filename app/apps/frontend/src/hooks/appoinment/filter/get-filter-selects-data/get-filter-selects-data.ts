import {  useContext } from 'react';
import { NeighborhoodsContext } from '../../../../contexts/neighborhoods-context';

export interface SelectData {
  value: string;
  text: string;
  disabled?: boolean;
}
export interface UseGetFilterSelectsData {
  findBy: SelectData[],
  sex: SelectData[],
  specie: SelectData[],
  size: SelectData[],
  status: SelectData[],
  neighborhood: SelectData[],
  orderBy: SelectData[],
  hour: SelectData[],
}

export function useGetFilterSelectsData(): UseGetFilterSelectsData {
  const neighborhoods = useContext(NeighborhoodsContext) as string[];

  const neighborhoodsData: SelectData[] = neighborhoods.map((neig) => ({value: neig, text: neig})) 
  return({
    findBy: [
      { text: 'DNI', value: 'dni' },
      { text: 'Nombre y Apellido', value: 'owner' },
    ],
    sex: [
      { value: '', text: 'Todos' },
      { value: 'Macho', text: 'Macho' },
      { value: 'Hembra', text: 'Hembra' },
    ],
    specie: [
      { value: '', text: 'Todos' },
      { value: 'Canino', text: 'Canino' },
      { value: 'Felino', text: 'Felino' },
    ],
    size: [
      { value: '', text: 'Todos' },
      { value: 'Grande', text: 'Grande' },
      { value: 'Mediano', text: 'Mediano' },
      { value: 'Pequeño', text: 'Pequeño' },
    ],
    status: [
      { value: '', text: 'Todos' },
      { value: 'Pendiente', text: 'Pendiente' },
      { value: 'Realizado', text: 'Realizado' },
      { value: 'Cancelado', text: 'Cancelado' },
      { value: 'Ausentado', text: 'Ausentado' },
      { value: 'Esperando Actualización', text: 'Esperando Actualización' },
    ],
    neighborhood: [
      {value: "", text: "Todos"},
      ...neighborhoodsData
    ],
    orderBy: [
      {value: 'id-asc', text: 'Más antiguo a más nuevo'},
      {value: 'id-desc', text: 'Más nuevo a más antiguo'},
      {value: 'owner-asc', text: 'Dueño(A-Z)'},
      {value: 'owner-desc', text: 'Dueño(Z-A)'},
      {value: 'date-asc', text: 'Fecha(Ascendente)'},
      {value: 'date-desc', text: 'Fecha(Descendente)'}
    ],
    hour:[
      { value: '', text: 'Todos' },
      { value: '8:00', text: '8:00' },
      { value: '10:00', text: '10:00' },
      { value: '12:00', text: '12:00' },
    ]
  })
}

export default useGetFilterSelectsData;
