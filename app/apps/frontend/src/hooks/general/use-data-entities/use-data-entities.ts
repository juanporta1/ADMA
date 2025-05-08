import axios, { AxiosResponse } from 'axios';
import { useState, useCallback, useContext } from 'react';
import { ApiHostContext } from '../../../contexts/api-host-context';
import {
  Neighborhood,
  newNeighborhood,
  newReason,
  newSpecie,
  Reason,
  Specie,
} from '../../../types/data-entities.types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DataEntities {
  reasons: Reason[];
  species: Specie[];
  neighborhoods: Neighborhood[];
}

export interface editedNeighborhood {
  neighborhood?: string;
  inUse?: boolean;
}
export interface editedSpecie {
  specie?: string;
  inUse?: boolean;
}
export interface editedReason {
  reason?: string;
  reasonSex?: 'a' | 'm' | 'h';
  inUse?: boolean;
}

export interface UseDataEntities {
  getData: () => Promise<DataEntities>;
  createNewData: (
    data: newNeighborhood | newReason | newSpecie,
    type: 'neighborhood' | 'specie' | 'reason'
  ) => Promise<void>;
  editData: (
    type: 'neighborhood' | 'specie' | 'reason',
    id: number,
    data: editedNeighborhood | editedReason | editedSpecie
  ) => void;
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
      const res: AxiosResponse<Reason[]> = await axios.get(`${host}/data-entities/reason`);
      const updatedReasons: Reason[] = res.data.filter(r => r.reason !== "Otro")
        .concat(res.data.filter(r => r.reason === "Otro"))
      return updatedReasons;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const getData = async () => {
    return {
      neighborhoods: await getNeighborhoods(),
      species: await getSpecies(),
      reasons: await getReasons(),
    };
  };

  const createNewData = async (
    data: newNeighborhood | newReason | newSpecie,
    type: 'neighborhood' | 'specie' | 'reason'
  ) => {
    const res = await axios.post(`${host}/data-entities/${type}`, data);
    console.log(res);
  };

  const stopUsingData = async (
    type: 'neighborhood' | 'specie' | 'reason',
    id: number,
    data: editedNeighborhood | editedReason | editedSpecie
  ) => {
    const res = await axios.patch(`${host}/data-entities/${type}/${id}`, data);
  };
  return { getData, createNewData, editData: stopUsingData };
}

export default useDataEntities;
