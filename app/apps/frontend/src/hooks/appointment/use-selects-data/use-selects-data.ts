import { useState, useCallback, useContext } from 'react';
import useDataEntities from '../../general/use-data-entities/use-data-entities';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseSelectsData {
  getSelectData: () => Promise<AppoinmentSelects>;
}

export interface AppoinmentSelects {
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
  value: string | number;
  text: string;
  disabled?: boolean;
}

export function useSelectsData(): UseSelectsData {
  const { getData } = useDataEntities();
  const getSelectData = async () => {
    const {neighborhoods, reasons, species} = await getData();
    const neighborhoodsData: SelectData[] = neighborhoods.map((neig) => ({
      value: neig.ID_neighborhood,
      text: neig.neighborhood,
    }));
  
    const speciesData: SelectData[] = species.map((spec) => ({
      value: spec.ID_specie,
      text: spec.specie,
    }));
  
    const reasonsData: SelectData[] = reasons.map((reason) => ({
      value: reason.ID_reason,
      text: reason.reason,
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
      specie: [{ value: '', text: 'Todos' }, ...speciesData],
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
        ...reasonsData,
      ],
    };
  }
  return { getSelectData }; // return the useDataEntities hook objec
}

export default useSelectsData;
