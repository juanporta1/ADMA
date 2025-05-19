import axios, { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { ApiHostContext } from '../../../contexts/api-host-context';
import {
  DataEntities,
  editedNeighborhood,
  editedReason,
  editedSpecie,
  editedVeterinarian,
  newNeighborhood,
  newReason,
  newSpecie,
  newVeterinarian,
  Reason,
  Veterinarian,
} from '../../../types/data-entities.types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface

export interface UseDataEntities {
  getData: () => Promise<DataEntities>;
  createNewData: (
    data: newNeighborhood | newReason | newSpecie | newVeterinarian,
    type: 'neighborhood' | 'specie' | 'reason' | 'veterinarian'
  ) => Promise<void>;
  editData: (
    type: 'neighborhood' | 'specie' | 'reason' | 'veterinarian',
    id: number,
    data: editedNeighborhood | editedReason | editedSpecie | editedVeterinarian
  ) => Promise<void>;
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

  const getData = async () => {
    const [neighborhoods, species, reasons, veterinarians] = await Promise.all([
      getNeighborhoods(),
      getSpecies(),
      getReasons(),
      getVeterinarians(),
    ]);
    return {
      neighborhoods,
      species,
      reasons,
      veterinarians,
    };
  };

  const createNewData = async (
    data: newNeighborhood | newReason | newSpecie | newVeterinarian,
    type: 'neighborhood' | 'specie' | 'reason' | 'veterinarian'
  ) => {
    const res = await axios.post(`${host}/data-entities/${type}`, data);
    console.log(res);
  };

  const stopUsingData = async (
    type: 'neighborhood' | 'specie' | 'reason' | 'veterinarian',
    id: number,
    data: editedNeighborhood | editedReason | editedSpecie | editedVeterinarian
  ) => {
    const res = await axios.patch(`${host}/data-entities/${type}/${id}`, data);
  };
  return { getData, createNewData, editData: stopUsingData };
}

export default useDataEntities;
