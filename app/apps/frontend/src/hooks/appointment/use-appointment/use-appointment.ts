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
  edit: (appointment: EditFormValues, id: number) => Promise<void>;
  remove: (id: number) => void;
  create: (values: FormValues) => void;
  generatePDF: (filters: FilterParams, values: string[]) => Promise<void>;
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
  lastName: string;
  name: string;
  home: string;
  neighborhood: number;
  phone?: string | null;
  dni: string;
  date: Date;
  hour: string;
  size: string;
  sex: string;
  specie: number;
  observations: string | null;
  status?: string;
  reason?: number;
}

export function useAppointment(): UseAppointment {
  const host = useContext(ApiHostContext);
  async function create(values: FormValues): Promise<void> {
    const newAppointment: NewAppointment = {
      lastName: values.lastName,
      name: values.name,
      home: values.home,
      neighborhood: Number(values.neighborhood),
      dni: values.dni,
      phone: values.phone,
      specie: Number(values.specie),
      size: values.size,
      sex: values.sex,
      date: values.date,
      hour: values.hour,
      observations: values.observations ? values.observations?.trim() : null,
    };

    const response = await axios.post(
      `${host}/appointment`,
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
        const { input, findBy, neighborhood, specie, ...otherParams } = params;
        if (!findBy) return null;
        const newObject = {
          [findBy]: input,
          neighborhood: Number(neighborhood),
          specie: Number(specie),
          ...otherParams,
        };
        res = await axios.get(`${host}/appointment`, {
          params: newObject,
        });
      } else {
        res = await axios.get(`${host}/appointment`, {
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
        .delete(`${host}/appointment/${id}`)
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
  async function edit(appointment: EditFormValues, id: number): Promise<void> {
    try {
      const editedAppointment: NewAppointment = {
        
        lastName: appointment.lastName.trim(), 
        name: appointment.name.trim(),
        home: appointment.home.trim(),
        neighborhood: Number(appointment.neighborhood),
        phone: appointment.phone,
        dni: appointment.dni.trim(),
        status: appointment.status,
        reason: Number(appointment.reason),
        observations: appointment.observations
          ? appointment.observations?.trim()
          : null,
        date: appointment.date,
        hour: appointment.hour,
        sex: appointment.sex,
        specie: Number(appointment.specie),
        size: appointment.size,
      };
      const res = await axios.put(`${host}/appointment/${id}`, editedAppointment);
      console.log(res.data);
    } catch (error) {
      console.error(error);
      throw error; // Lanzar nuevamente el error para que sea manejado por el llamad
    }
  }
    async function generatePDF(filters: FilterParams, values: string[]): Promise<void> {
      try{
        const res = await axios.get(`${host}/appointment/pdf`, {
          responseType: 'blob',
          params: {...filters, values: values},
          
        })

        const blob = res.data;
        const link = document.createElement('a');
        const url = window.URL.createObjectURL(blob);  
        link.href = url;
        link.download = 'ADMA.pdf'; 
        link.click();
      }catch(err){
        throw err;
      }
    }

  return { filter, create, edit, remove, generatePDF };
}

export default useAppointment;
