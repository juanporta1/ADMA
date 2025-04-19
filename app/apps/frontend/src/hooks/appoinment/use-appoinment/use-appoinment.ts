import { useState, useCallback, useContext } from 'react';
import {
  Appoinment,
  FilterParams,
} from '../../../components/pages/appoinment/filter/filter-appoinments';
import { notifications } from '@mantine/notifications';
import axios from 'axios';
import { ApiHostContext } from '../../../contexts/api-host-context';
import { EditFormValues } from '../../../components/pages/appoinment/edit/edit-appoinment';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseAppoinment {
  filter: (params: FilterParams) => Promise<Appoinment[] | null>;
  edit: (appoinment: EditFormValues, id: number) => Promise<void>;
  remove: (id: number) => void;
  create: (values: FormValues) => void;
}
interface FormValues {
  lastName: string;
  name: string;
  dni: string;
  phone: string;
  home: string;
  neighborhood: string;
  size: string;
  sex: string;
  specie: string;
  date: Date;
  observations: string;
  hour: string;
}

interface NewAppoinment {
  owner: string;
  home: string;
  neighborhood: string;
  phone: string;
  dni: string;
  date: Date;
  hour: string;
  size: string;
  sex: string;
  specie: string;
  observations: string | null;
}

export function useAppoinment(): UseAppoinment {
  const host = useContext(ApiHostContext);
  async function create(values: FormValues): Promise<void> {
    const newOwner = `${values.lastName},${values.name}`;
    const newAppoinment: NewAppoinment = {
      owner: newOwner,
      home: values.home,
      neighborhood: values.neighborhood,
      dni: values.dni,
      phone: values.phone,
      specie: values.specie,
      size: values.size,
      sex: values.sex,
      date: values.date,
      hour: values.hour,
      observations: values.observations ? values.observations?.trim() : null,
    };

    const response = await axios.post(
      'http://localhost:3000/api/appoinment',
      newAppoinment
    );
    console.log(response.data);

    notifications.show({
      title: 'Carga del nuevo turno exitosa',
      message: 'El turno ha sido agendado.',
      color: 'green',
    });
  }

  async function filter(params: FilterParams): Promise<Appoinment[] | null> {
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
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  async function remove(id: number) {
    try {
      await axios
        .delete(`${host}/appoinment/${id}`)
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
    } catch (err) {
      throw err;
    }
  }
  async function edit(appoinment: EditFormValues, id: number): Promise<void> {
    try {
      const editedAppoinment: Appoinment = {
        ID_appoinment: id,
        owner: `${appoinment.lastName},${appoinment.name}`,
        home: appoinment.home,
        neighborhood: appoinment.neighborhood,
        phone: appoinment.phone,
        dni: appoinment.dni,
        status: appoinment.status,
        reason: appoinment.reason,
        observations: appoinment.observations
          ? appoinment.observations?.trim()
          : null,
        date: appoinment.date,
        hour: appoinment.hour,
        sex: appoinment.sex,
        specie: appoinment.specie,
        size: appoinment.size,
      };
      const res = await axios.put(`${host}/appoinment/${id}`, editedAppoinment);
      console.log(res.data);
    } catch (error) {
      console.error(error);
      throw error; // Lanzar nuevamente el error para que sea manejado por el llamad
    }
  }
  return { filter, create, edit, remove };
}

export default useAppoinment;
