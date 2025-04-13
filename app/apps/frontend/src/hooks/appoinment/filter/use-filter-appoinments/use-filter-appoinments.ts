import axios from 'axios';
import { useState, useCallback, useContext } from 'react';
import { ApiHostContext } from '../../../../contexts/api-host-context';
interface FilterParams {
  sex?: string;
  race?: string;
  size?: string;
  neighborhood?: string;
  startDate?: Date;
  endDate?: Date;
  input?: string;
  orderBy?: string;
  onlyByHour?: string;
  findBy?: 'dni' | 'owner';
}
interface Appoinment {
  ID_appoinment: number;
  owner: string;
  home: string;
  neighborhood: string;
  phone: string;
  dni: string;
  date: Date;
  size: 'Grande' | 'Pequeño' | 'Mediano';
  sex: 'Macho' | 'Hembra';
  race: 'Canino' | 'Felino';
  status:
    | 'Pendiente'
    | 'Cancelado'
    | 'Ausentado'
    | 'Realizado'
    | 'Esperando Actualización';
  observations: string | null;
  reason: string | null;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseFilterAppoinments {
  filterAppoinments: (params: FilterParams) => Promise<Appoinment[]>;
}

export function useFilterAppoinments(): UseFilterAppoinments {
  const host = useContext(ApiHostContext);
  async function filterAppoinments(params: FilterParams) {
    
    let res;
    try {
      if (params.input) {
        const { input, findBy, ...otherParams } = params;
        if (!findBy) return null;
        const newObject = {
          [findBy]: input,
          ...otherParams,
        };
        res = await axios.get(`${host}/appoinment`, {
          params: newObject,
        });
      } else {
        res = await axios.get(`${host}/appoinment`, {
          params,
        });
      
      }
      console.log(res.data)
      return res.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  return { filterAppoinments };
}

export default useFilterAppoinments;
