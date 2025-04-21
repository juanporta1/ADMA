import { useState, useCallback, useContext } from 'react';
import {
  Appointment,
  FilterParams,
} from '../../../components/pages/appointment/filter/filter-appointments';
import { notifications } from '@mantine/notifications';
import axios from 'axios';
import { ApiHostContext } from '../../../contexts/api-host-context';
import { EditFormValues } from '../../../components/pages/appointment/edit/edit-appointment';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseAppointment {
  filter: (params: FilterParams) => Promise<Appointment[] | null>;
  edit: (aappointment: EditFormValues, id: number) => Promise<void>;
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

interface NewAppointment {
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

export function useAppointment(): UseAppointment {
  const host = useContext(ApiHostContext);
  async function create(values: FormValues): Promise<void> {
    const newOwner = `${values.lastName},${values.name}`;
    const newAppointment: NewAppointment = {
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
      'http://localhost:3000/api/aappointment',
      newAppointment
    );
    console.log(response.data);

    notifications.show({
      title: 'Carga del nuevo turno exitosa',
      message: 'El turno ha sido agendado.',
      color: 'green',
    });
  }

  async function filter(params: FilterParams): Promise<Appointment[] | null> {
    let res;
    try {
      if (params.input) {
        const { input, findBy, ...otherParams } = params;
        if (!findBy) return null;
        const newObject = {
          [findBy]: input,
          ...otherParams,
        };
        res = await axios.get(`${host}/aappointment`, {
          params: newObject,
        });
      } else {
        res = await axios.get(`${host}/aappointment`, {
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
        .delete(`${host}/aappointment/${id}`)
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
  async function edit(aappointment: EditFormValues, id: number): Promise<void> {
    try {
      const editedAppointment: Appointment = {
        ID_aappointment: id,
        owner: `${aappointment.lastName},${aappointment.name}`,
        home: aappointment.home,
        neighborhood: aappointment.neighborhood,
        phone: aappointment.phone,
        dni: aappointment.dni,
        status: aappointment.status,
        reason: aappointment.reason,
        observations: aappointment.observations
          ? aappointment.observations?.trim()
          : null,
        date: aappointment.date,
        hour: aappointment.hour,
        sex: aappointment.sex,
        specie: aappointment.specie,
        size: aappointment.size,
      };
      const res = await axios.put(`${host}/aappointment/${id}`, editedAppointment);
      console.log(res.data);
    } catch (error) {
      console.error(error);
      throw error; // Lanzar nuevamente el error para que sea manejado por el llamad
    }
  }
  return { filter, create, edit, remove };
}

export default useAppointment;
