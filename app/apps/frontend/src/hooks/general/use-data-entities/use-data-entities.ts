import axios from 'axios';
import { useState, useCallback, useContext } from 'react';
import { ApiHostContext } from '../../../contexts/api-host-context';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DataEntities {
  reasons: { ID_reason: number; reason: string }[];
  species: { ID_specie: number; specie: string }[];
  neighborhoods: { ID_neighborhood: number; neighborhood: string }[];
}

export interface UseDataEntities {
  getData: () => Promise<DataEntities>;
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
      const res = await axios.get(`${host}/data-entities/reason`);
      return res.data;
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

  return { getData };
}

export default useDataEntities;
