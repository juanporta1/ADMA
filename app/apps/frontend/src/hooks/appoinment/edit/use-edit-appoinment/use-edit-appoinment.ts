import { useState, useCallback, useContext } from 'react';
import { EditFormValues } from '../../../../components/pages/appoinment/edit/edit-appoinment';
import axios from 'axios';
import { ApiHostContext } from '../../../../contexts/api-host-context';
import { Appoinment } from '../../../../components/pages/appoinment/filter/filter-appoinments';
 

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseEditAppoinment {
  editAppoinment: (appoinment: EditFormValues, id: number) => void;
}

export function UseEditAppoinment(): UseEditAppoinment {
  const host = useContext(ApiHostContext);
  async function editAppoinment(appoinment: EditFormValues, id: number) {
    try{
      const editedAppoinment: Appoinment = {
        ID_appoinment: id,
        owner: `${appoinment.lastName},${appoinment.name}`,
        home: appoinment.home,
        neighborhood: appoinment.neighborhood,
        phone: appoinment.phone,
        dni: appoinment.dni,
        status: appoinment.status,
        reason: appoinment.reason,
        observations: appoinment.observations,
        date: appoinment.date,
        hour: appoinment.hour,
        sex: appoinment.sex,
        specie: appoinment.specie,
        size: appoinment.size,
      } 
      const res = await axios.put(`${host}/appoinment/${id}`, editedAppoinment);
      console.log(res.data);
    }catch(error){
      console.error(error);
      throw error; // Lanzar nuevamente el error para que sea manejado por el llamad
    }
  }
  return {
    editAppoinment,
  };
}

export default UseEditAppoinment;
