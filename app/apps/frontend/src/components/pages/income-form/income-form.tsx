import { Box, Flex, Grid } from '@mantine/core';
import styles from './income-form.module.css';
import useIncomeForm from '../../../hooks/income-form/use-income-form/use-income-form';
import FormColumn from '../../utilities/form-column/form-column';
import { SelectData } from '../../../hooks/appointment/use-selects-data/use-selects-data';
import useAppointment from '../../../hooks/appointment/use-appointment/use-appointment';
import React, { useEffect, useState } from 'react';
import { Appointment } from '../appointment/filter/filter-appointments';
import StatusTable from './status-table/status-table';

export function IncomeForm() {
  const { form } = useIncomeForm();
  const hourData: SelectData[] = [
    { value: '8:00', text: '8:00' },
    { value: '10:00', text: '10:00' },
    { value: '12:00', text: '12:00' },
  ];
  const { filter } = useAppointment();
  const [appointments, setAppointments] = useState<(Appointment[] | null)[]>([]);

  const fetchAppointments = async (date: string, hour: string) => {
    const status = ["Esperando Actualización", "Pendiente", "Realizado", "No Realizado", "Ausentado", "Cancelado", "En Proceso"]
    const filteredAppointments = await Promise.all(
      status.map(s => filter({ date: new Date(), hour: hour, status: s }))
    )
    setAppointments(filteredAppointments);
  };

  const accordions = (): React.ReactNode[] => {
    return appointments.map((a) => {
      if (a)
        return <StatusTable appointments={a} />
      else return <></>
    })
  }
  useEffect(() => {
    fetchAppointments(form.getValues().date, form.getValues().hour);

  }, [form.values]);

  return (
    <Flex h={'100%'} direction={'row'} gap={'lg'}>
      <Grid w={"30%"}>
        <FormColumn
          inputType="date"
          form={form}
          name="date"
          label="Fecha: "
          span={12}
          notRequired
        />
        <FormColumn
          inputType="select"
          form={form}
          name="hour"
          label="Hora: "
          data={hourData}
          span={12}
          notRequired
        />
      </Grid>
      <Box style={{ border: '1px solid #aaaa', width: "100%" }}>
        {accordions().map()}
      </Box>
    </Flex>
  );
}

export default IncomeForm;
