import { useForm, UseFormReturnType } from '@mantine/form';
import { useState, useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseCreateForm {
  form: UseFormReturnType<any>;
}

export function useCreateForm(): UseCreateForm {
  const form = useForm({
    mode: 'controlled',
    initialValues: {
      lastName: '',
      name: '',
      dni: '',
      phone: '',
      neighborhood: '',
      size: '',
      race: '',
      sex: '',
      home: '',
      date: new Date(),
      observations: '',
      hour: '',
    },
    validate: {
      lastName: (value: string) => {
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(value))
          return 'El apellido unicamente debe contener letras.';
        else return null;
      },
      name: (value: string) => {
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(value))
          return 'El nombre unicamente debe contener letras.';
        else return null;
      },
      dni: (value: string) => {
        if (!/^\d+$/.test(value))  // Changed regex to validate only numbers
          return 'El DNI unicamente debe contener numeros.';
        else return null;
      },
      phone: (value: string) => {
        if (!/^\d+$/.test(value))  // Changed regex to validate only numbers
          return 'El teléfono unicamente debe contener numeros.';
        else return null;
      },
      observations: (value: string) => {
        if (value.length > 800)
          return 'Las observaciones no pueden ser tan largas.';  // Fixed error message
        else return null;
      },
    },
  });
  return {form};
}

export default useCreateForm;
