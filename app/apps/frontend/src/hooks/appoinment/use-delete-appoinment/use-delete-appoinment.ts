import { useState, useCallback } from 'react';
import { Appoinment } from '../../../components/pages/appoinment/filter/filter-appoinments';
import { notifications } from '@mantine/notifications';
import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface useDeleteAppoinment {
  deleteAppoinment: (appoinment: Appoinment) => void;
}

export function useDeleteAppoinment(): useDeleteAppoinment {
  async function deleteAppoinment(appoinment: Appoinment) {
    try {
      if (appoinment) {
        await axios
          .delete(
            `http://localhost:3000/api/appoinment/${appoinment.ID_appoinment}`
          )
          .then((res) => {
            console.log(res.data);
            notifications.show({
              title: 'Se ha eliminado el registro',
              message: 'La operacion ha sido exitosa',
              color: 'green',
            });
          })
          .catch((err) => {
            notifications.show({
              title: 'Ha ocurrido un error',
              message: 'Ha pasado algo en el proceso de eliminar el registro',
              color: 'red',
            });
          });
      }
    } catch (err) {
      throw err;
    }
  }
  return { deleteAppoinment };
}

export default useDeleteAppoinment;
