import axios, { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { ApiHostContext } from '../../../contexts/api-host-context';
import {
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

export interface UseDataEntities {
  getData: () => Promise<DataEntities>;
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

  const getData = async () => {
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
    };
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
    const res = await axios.post(`${host}/data-entities/${type}`, data);
    console.log(res);
  };

  const deleteData = async (type: 'appointment-schedule', id: number) => {
    try {
      const res = await axios.delete(`${host}/data-entities/${type}/${id}`);
    } catch (err) {
      console.log(err);
      throw new Error('Error deleting data');
    }
  };

  const stopUsingData = async (
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
    const res = await axios.patch(`${host}/data-entities/${type}/${id}`, data);
  };
  return { getData, createNewData, editData: stopUsingData, deleteData };
}

export default useDataEntities;
