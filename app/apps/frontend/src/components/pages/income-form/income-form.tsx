import { Box, Flex, Grid } from '@mantine/core';
import styles from './income-form.module.css';
import useIncomeForm from '../../../hooks/income-form/use-income-form/use-income-form';
import FormColumn from '../../utilities/form-column/form-column';
import { SelectData } from '../../../hooks/appointment/use-selects-data/use-selects-data';
import useAppointment from '../../../hooks/appointment/use-appointment/use-appointment';
import { useEffect, useState } from 'react';
import { Appointment } from '../appointment/filter/filter-appointments';

export function IncomeForm() {
  const { form } = useIncomeForm();
  const hourData: SelectData[] = [
    { value: '8:00', text: '8:00' },
    { value: '10:00', text: '10:00' },
    { value: '12:00', text: '12:00' },
  ];
  const { filter } = useAppointment();
  const [appointments, setAppointments] = useState<Appointment[] | null>([]);

  const fetchAppointments = async (date: string, hour: string) => {
    const res = await filter({
      byHour: hour,
      date: new Date(date),
      dateFilterWay: 'onlyOne',
    });
    setAppointments(res);
  };
  useEffect(() => {
    fetchAppointments(form.getValues().date, form.getValues().hour);
    
  }, [form.values]);

  useEffect(() => {
    console.log(appointments)
  }, [appointments])
  return (
    <Flex h={'85vh'} p={'lg'} direction={'column'} gap={'lg'}>
      <Grid>
        <FormColumn
          inputType="date"
          form={form}
          name="date"
          label="Fecha: "
          span={3}
          notRequired
        />
        <FormColumn
          inputType="select"
          form={form}
          name="hour"
          label="Hora: "
          data={hourData}
          span={3}
          notRequired
        />
      </Grid>
      <Box style={{ border: '1px solid #aaaa' }} h={'100%'}></Box>
    </Flex>
  );
}

export default IncomeForm;
