import { useState, useCallback, useContext } from 'react';
import useDataEntities from '../../general/use-data-entities/use-data-entities';
import { text } from 'stream/consumers';
import { Appointment } from '../../../types/entities.types';
import { AppoinmentSelects, SelectData } from '../../../types/utilities.types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseSelectsData {
  getSelectData: (appointment?: Appointment) => Promise<AppoinmentSelects>;
}

export function useSelectsData(): UseSelectsData {
  const { getData } = useDataEntities();
  const getSelectData = async (appointment?: Appointment) => {
    const { neighborhoods, reasons, species } = await getData();
    const neighborhoodsData: SelectData[] = neighborhoods
      .filter((n) => n.inUse)
      .map((neig) => ({
        value: neig.ID_neighborhood,
        text: neig.neighborhood,
      }));

    const speciesData: SelectData[] = species
      .filter((s) => s.inUse)
      .map((spec) => ({
        value: spec.ID_specie,
        text: spec.specie,
      }));

    const sex = appointment?.sex === 'Macho' ? 'm' : 'h';
    const reasonsData: SelectData[] = reasons
      .filter((r) => (r.reasonSex === 'a' || r.reasonSex === sex) && r.inUse)
      .map((reason) => {
        return {
          value: reason.ID_reason,
          text: reason.reason,
        };
      });

    return {
      findBy: [
        { text: 'DNI', value: 'dni' },
        { text: 'Apellido y Nombre', value: 'owner' },
      ],
      sex: [
        { value: '', text: 'Todos' },
        { value: 'Macho', text: 'Macho' },
        { value: 'Hembra', text: 'Hembra' },
      ],
      restrictedSex: [
        { value: '', text: 'Seleccione un sexo', disabled: true },
        { value: 'Macho', text: 'Macho' },
        { value: 'Hembra', text: 'Hembra' },
      ],
      specie: [{ value: '', text: 'Todos' }, ...speciesData],
      restrictedSpecie: [
        { value: '', text: 'Seleccione una especie', disabled: true },
        ...speciesData,
      ],
      size: [
        { value: '', text: 'Todos' },
        { value: 'Grande', text: 'Grande' },
        { value: 'Mediano', text: 'Mediano' },
        { value: 'Pequeño', text: 'Pequeño' },
      ],
      restrictedSize: [
        { value: '', text: 'Seleccione un tamaño', disabled: true },
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
        { value: '', text: 'Seleccione un estado', disabled: true },
        { value: 'Pendiente', text: 'Pendiente' },
        { value: 'Cancelado', text: 'Cancelado' },
      ],
      neighborhood: [{ value: '', text: 'Todos' }, ...neighborhoodsData],
      restrictedNeighborhood: [
        { value: '', text: 'Seleccione un barrio', disabled: true },
        ...neighborhoodsData,
      ],
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
        { value: '', text: 'Seleccione una razón', disabled: true },
        ...reasonsData,
      ],
      dateFilterWay: [
        { value: 'all', text: 'Todas' },
        { value: 'interval', text: 'Por Intervalo' },
        { value: 'onlyOne', text: 'Por dia único' },
      ],
    };
  };
  return { getSelectData }; // return the useDataEntities hook objec
}

export default useSelectsData;
