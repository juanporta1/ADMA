import { Accordion, Box, Flex, Grid } from '@mantine/core';
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
  const [appointments, setAppointments] = useState<(Appointment[] | null)[]>(
    []
  );

  const fetchAppointments = async (date: string, hour: string) => {
    const status = [
      'Pendiente',
      'Esperando Actualización',
      'En Proceso',
      'No Realizado',
      'Ausentado',
      'Cancelado',
      'Realizado',
    ];
    const filteredAppointments = await filter({date: new Date(date), hour: hour, dateFilterWay: "onlyOne"})
    if (!filteredAppointments) return;
    const redAppointments = filteredAppointments.filter(
      (a) => ["Ausentado", "Cancelado", "No Realizado"].includes(a.status)
    );
    const inProcessA = filteredAppointments.filter(
      (a) => a.status === "En Proceso"
    );

    const waitingA = filteredAppointments.filter(
      (a) => a.status === "Esperando Actualización"
    );
    const doneA = filteredAppointments.filter((a) => a.status === "Realizado");
    const pendingA = filteredAppointments.filter(
      (a) => a.status === "Pendiente"
    );

    const arrays = [redAppointments, inProcessA, waitingA, doneA, pendingA];
    
    setAppointments(arrays.filter((a) => a.length !== 0));
  };

  const Accordions = appointments
    .filter((a) => a && a.length !== 0)
    .map((a) => (
      <StatusTable
        key={`appointment-${a![0].ID_appointment}`} // prefijo para evitar duplicados
        appointments={a!}
      />
    ));

  useEffect(() => {
    fetchAppointments(form.getValues().date, form.getValues().hour);
    console.log(form.values);
  }, [form.values]);
  useEffect(() => console.log(appointments), [appointments]);
  return (
    <Flex h={'100%'} direction={'row'} gap={'lg'}>
      <Grid w={'30%'}>
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
      <Box style={{ border: '1px solid #aaaa', width: '100%' }}>
        <Accordion variant='separated' classNames={{panel: styles.row}}>{Accordions}</Accordion>
      </Box>
    </Flex>
  );
}

export default IncomeForm;
