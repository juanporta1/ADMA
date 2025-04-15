// Hook para crear un nuevo turno y mostrar notificaciones
import axios from 'axios';
import { notifications } from '@mantine/notifications';

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

export interface UseCreateAppoinment {
  createAppoinment: (values: FormValues) => Promise<void>;
}

// Envía los datos del turno al backend y muestra una notificación de éxito
export function useCreateAppoinment(): UseCreateAppoinment {
  const createAppoinment = async (values: FormValues): Promise<void> => {
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
      observations: values.observations,
    };

    const response = await axios.post('http://localhost:3000/api/appoinment', newAppoinment);
    console.log(response.data);
    
    notifications.show({
      title: 'Carga del nuevo turno exitosa',
      message: 'El turno ha sido agendado.',
      color: 'green',
    });
  };

  return { createAppoinment };
}

export default UseCreateAppoinment;
