import { useState, useCallback, useContext } from 'react';
import { NeighborhoodsContext } from '../../../contexts/neighborhoods-context';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseSelectsData {
  findBy: SelectData[];
  sex: SelectData[];
  specie: SelectData[];
  size: SelectData[];
  filterStatus: SelectData[];
  status: SelectData[];
  neighborhood: SelectData[];
  orderBy: SelectData[];
  hour: SelectData[];
  reason: SelectData[];
}
export interface SelectData {
  value: string;
  text: string;
  disabled?: boolean;
}

export function useSelectsData(): UseSelectsData {
  const neighborhoods = useContext(NeighborhoodsContext) as string[];

  const neighborhoodsData: SelectData[] = neighborhoods.map((neig) => ({
    value: neig,
    text: neig,
  }));
  return {
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
    filterStatus: [
      { value: '', text: 'Todos' },
      { value: 'Pendiente', text: 'Pendiente' },
      { value: 'Cancelado', text: 'Cancelado' },
      { value: 'Ausentado', text: 'Ausentado' },
      { value: 'Esperando Actualización', text: 'Esperando Actualización' },
      { value: 'En Proceso', text: 'En Proceso' },
      { value: 'Realizado', text: 'Realizado' },
      { value: 'No Realizado', text: 'No Realizado' },
    ],
    status: [
      { value: 'Pendiente', text: 'Pendiente' },
      { value: 'Cancelado', text: 'Cancelado' },
    ],
    neighborhood: [{ value: '', text: 'Todos' }, ...neighborhoodsData],
    orderBy: [
      { value: 'id-desc', text: 'Orden de Carga(A-Z)' },
      { value: 'id-asc', text: 'Orden de Carga(Z-A)' },
      { value: 'owner-asc', text: 'Dueño(A-Z)' },
      { value: 'owner-desc', text: 'Dueño(Z-A)' },
      { value: 'date-asc', text: 'Fecha(Ascendente)' },
      { value: 'date-desc', text: 'Fecha(Descendente)' },
    ],
    hour: [
      { value: '', text: 'Todos' },
      { value: '8:00', text: '8:00' },
      { value: '10:00', text: '10:00' },
      { value: '12:00', text: '12:00' },
    ],
    reason: [
      { value: '', text: 'Seleccione un motivo', disabled: true },
      // General reasons
      { value: 'Enfermedad del dueño', text: 'Enfermedad del dueño' },
      { value: 'Problemas de transporte', text: 'Problemas de transporte' },
      { value: 'Emergencia familiar', text: 'Emergencia familiar' },
      // Female-specific reasons
      { value: 'En celo', text: 'En celo (Solo hembras)' },
      { value: 'Preñada', text: 'Preñada (Solo hembras)' },
      { value: 'Post parto', text: 'Post parto (Solo hembras)' },
      { value: 'Agresividad', text: 'Agresividad' },
      { value: 'Marcaje territorial', text: 'Marcaje territorial' },
      { value: 'Otro', text: 'Otro' },
    ],
  };
}

export default useSelectsData;
