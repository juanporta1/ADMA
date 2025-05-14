import { useForm, UseFormReturnType } from '@mantine/form';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseEditForm {
  form: UseFormReturnType<any>;
}

export function useEditForm(): UseEditForm {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      lastName: '',
      name: '',
      dni: '',
      phone: '',
      neighborhood: '',
      size: '',
      sex: '',
      specie: '',
      home: '',
      date: null,
      observations: '',
      hour: '',
      status: '',
      reason: null,
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
        if (!/^\d+$/.test(value))
          return 'El DNI unicamente debe contener numeros.';
        else return null;
      },
      phone: (value: string) => {
        if (value.length === 0) return null;
        if (!/^\d+$/.test(value))
          return 'El teléfono unicamente debe contener numeros.';
        else return null;
      },
      observations: (value: string) => {
        if (value.length > 800)
          return 'Las observaciones no pueden ser tan largas.';
        else return null;
      },
    },
  });
  return { form };
}

export default useEditForm;
