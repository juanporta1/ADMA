import { useForm } from '@mantine/form';
import { AppoinmentContext } from '../contexts/appoinment-context';
import { ReactNode } from 'react';

interface props {
  children: ReactNode;
}
export function AppoinmentProvider({ children }: props) {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      sex: '',
      specie: '',
      size: '',
      neighborhood: '',
      startDate: new Date(),
      endDate: null,
      input: '',
      status: '',
      orderBy: '',
      byHour: '',
      findBy: 'dni'
    },
  });
  return (
    <AppoinmentContext.Provider value={form}>
      {children}
    </AppoinmentContext.Provider>
  );
}
