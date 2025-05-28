import axios, { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { ApiHostContext } from '../../../contexts/api-host-context';
import {
  AppointmentSchedule,
  DataEntities,
  editedAppointmentSchedule,
  editedNeighborhood,
  editedReason,
  editedSpecie,
  editedVeterinarian,
  newAppointmentSchedule,
  newNeighborhood,
  newReason,
  newSpecie,
  newVeterinarian,
  Reason,
} from '../../../types/data-entities.types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppointmentScheduleFilters {
  ID_appointmentSchedule?: number;
  date?: Date;
  hour?: string;
}
type EntityType =
  | 'neighborhoods'
  | 'species'
  | 'reasons'
  | 'veterinarians'
  | 'appointmentSchedules';

export interface UseDataEntities {
  getData: (entities: EntityType[]) => Promise<DataEntities>;
  filterAppointmentSchedules: (
    filters: AppointmentScheduleFilters
  ) => Promise<AppointmentSchedule[]>;
  createNewData: (
    data:
      | newNeighborhood
      | newReason
      | newSpecie
      | newVeterinarian
      | newAppointmentSchedule,
    type:
      | 'neighborhood'
      | 'specie'
      | 'reason'
      | 'veterinarian'
      | 'appointment-schedule'
  ) => Promise<void>;
  editData: (
    type:
      | 'neighborhood'
      | 'specie'
      | 'reason'
      | 'veterinarian'
      | 'appointment-schedule',
    id: number,
    data:
      | editedNeighborhood
      | editedReason
      | editedSpecie
      | editedVeterinarian
      | editedAppointmentSchedule
  ) => Promise<void>;
  deleteData: (type: 'appointment-schedule', id: number) => Promise<void>;
}

export function useDataEntities(): UseDataEntities {
  const host = useContext(ApiHostContext);

  const getSpecies = async () => {
    try {
      const res = await axios.get(`${host}/data-entities/specie`);
      return res.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };
  const getNeighborhoods = async () => {
    try {
      const res = await axios.get(`${host}/data-entities/neighborhood`);
      return res.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };
  const getReasons = async () => {
    try {
      const res: AxiosResponse<Reason[]> = await axios.get(
        `${host}/data-entities/reason`
      );
      const updatedReasons: Reason[] = res.data
        .filter((r) => r.reason !== 'Otro')
        .concat(res.data.filter((r) => r.reason === 'Otro'));
      return updatedReasons;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const getVeterinarians = async () => {
    try {
      const res = await axios.get(`${host}/data-entities/veterinarian`);
      return res.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const getAppointmentSchedules = async () => {
    try {
      const res = await axios.get(`${host}/data-entities/appointment-schedule`);
      console.log(res);
      return res.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  type EntityType =
    | 'neighborhoods'
    | 'species'
    | 'reasons'
    | 'veterinarians'
    | 'appointmentSchedules';

  const entityFunctionMap: Record<EntityType, () => Promise<any>> = {
    neighborhoods: getNeighborhoods,
    species: getSpecies,
    reasons: getReasons,
    veterinarians: getVeterinarians,
    appointmentSchedules: getAppointmentSchedules,
  };

  const getData = async (entities: EntityType[] = []) => {
    if (!entities.length) {
      const [
        neighborhoods,
        species,
        reasons,
        veterinarians,
        appointmentSchedules,
      ] = await Promise.all([
        getNeighborhoods(),
        getSpecies(),
        getReasons(),
        getVeterinarians(),
        getAppointmentSchedules(),
      ]);
      return {
        neighborhoods,
        species,
        reasons,
        veterinarians,
        appointmentSchedules,
      } as DataEntities;
    } else {
      // Ejecuta solo las funciones necesarias
      const results = await Promise.all(
        entities.map((entity) => entityFunctionMap[entity]())
      );
      // Devuelve un objeto con los resultados
      return entities.reduce((acc, entity, idx) => {
        acc[entity] = results[idx];
        return acc;
      }, {} as DataEntities);
    }
  };

  const filterAppointmentSchedules = async (
    filters: AppointmentScheduleFilters
  ) => {
    try {
      const res = await axios.get(
        `${host}/data-entities/appointment-schedule`,
        {
          params: filters,
        }
      );
      return res.data as AppointmentSchedule[];
    } catch (err) {
      console.log(err);
      return [];
    }
  };
  const createNewData = async (
    data:
      | newNeighborhood
      | newReason
      | newSpecie
      | newVeterinarian
      | newAppointmentSchedule,
    type:
      | 'neighborhood'
      | 'specie'
      | 'reason'
      | 'veterinarian'
      | 'appointment-schedule'
  ) => {
    await axios.post(`${host}/data-entities/${type}`, data);
  };

  const deleteData = async (type: 'appointment-schedule', id: number) => {
    try {
      await axios.delete(`${host}/data-entities/${type}/${id}`);
    } catch (err) {
      console.log(err);
      throw new Error('Error deleting data');
    }
  };

  const editData = async (
    type:
      | 'neighborhood'
      | 'specie'
      | 'reason'
      | 'veterinarian'
      | 'appointment-schedule',
    id: number,
    data:
      | editedNeighborhood
      | editedReason
      | editedSpecie
      | editedVeterinarian
      | editedAppointmentSchedule
  ) => {
    await axios.patch(`${host}/data-entities/${type}/${id}`, data);
  };
  return {
    getData,
    filterAppointmentSchedules,
    createNewData,
    editData,
    deleteData,
  };
}

export default useDataEntities;
