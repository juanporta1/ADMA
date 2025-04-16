import { useState, useCallback } from 'react';
import { EditFormValues } from '../../../../components/pages/appoinment/edit/edit-appoinment';
import axios from 'axios';
 

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseEditAppoinment {
  editAppoinment: (appoinment: EditFormValues, id: number) => void;
}

export function UseEditAppoinment(): UseEditAppoinment {
  async function editAppoinment(appoinment: EditFormValues, id: number) {
    try{
      const res = axios.put
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
