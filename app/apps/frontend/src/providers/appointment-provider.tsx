import { useForm } from '@mantine/form';
import { AppointmentContext } from '../contexts/appointment-context';
import { ReactNode } from 'react';

interface props {
  children: ReactNode;
}
export function AppointmentProvider({ children }: props) {
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
      orderBy: 'id-desc',
      byHour: '',
      findBy: 'dni'
    }
  });
  return (
    <AppointmentContext.Provider value={form}>
      {children}
    </AppointmentContext.Provider>
  );
}
