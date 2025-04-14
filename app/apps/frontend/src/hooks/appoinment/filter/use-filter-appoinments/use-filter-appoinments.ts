import axios from 'axios';
import { useContext } from 'react';
import { ApiHostContext } from '../../../../contexts/api-host-context';
import { Appoinment, FilterParams } from '../../../../components/pages/appoinment/filter/filter-appoinments';


 
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
