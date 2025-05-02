import { Accordion, Box, Flex, Grid } from '@mantine/core';
import styles from './income-form.module.css';
import useIncomeForm from '../../../hooks/income-form/use-income-form/use-income-form';
import FormColumn from '../../utilities/form-column/form-column';
import { SelectData } from '../../../hooks/appointment/use-selects-data/use-selects-data';
import useAppointment from '../../../hooks/appointment/use-appointment/use-appointment';
import { useEffect, useState } from 'react';
import { Appointment } from '../appointment/filter/filter-appointments';
import StatusTable from './status-table/status-table';
import { useDisclosure } from '@mantine/hooks';
import CanceledModal from './modals/canceled/canceled-modal';
import AdmissionModal from './modals/admission/admission-modal';
import AbsenceModal from './modals/absence/absence-modal';
import NotDoneModal from './modals/not-done/not-done-modal';
import DoneModal from './modals/done/done-modal';

export function IncomeForm() {
  const { form } = useIncomeForm();
  const hourData: SelectData[] = [
    { value: '8:00', text: '8:00' },
    { value: '10:00', text: '10:00' },
    { value: '12:00', text: '12:00' },
  ];
  const { filter, editStatus } = useAppointment();
  const [actualAppointment, setActualAppointment] =
    useState<Appointment | null>(null);
  const [appointments, setAppointments] = useState<(Appointment[] | null)[]>(
    []
  );

  const [absenceModal, { open: openAbsenceModal, close: closeAbsenceModal }] =
    useDisclosure(false);
  const [cancelModal, { open: openCancelModal, close: closeCancelModal }] =
    useDisclosure(false);
  const [
    admissionModal,
    { open: openAdmissionModal, close: closeAdmissionModal },
  ] = useDisclosure(false);
  const [doneModal, { open: openDoneModal, close: closeDoneModal }] =
    useDisclosure(false);
  const [notDoneModal, { open: openNotDoneModal, close: closeNotDoneModal }] =
    useDisclosure(false);
  const fetchAppointments = async () => {
    const filteredAppointments = await filter({
      date: new Date(form.getValues().date),
      byHour: form.getValues().hour,
      dateFilterWay: 'onlyOne',
    });
    if (!filteredAppointments) return;
    const redAppointments = filteredAppointments.filter((a) =>
      ['Ausentado', 'Cancelado', 'No Realizado'].includes(a.status)
    );
    const inProcessA = filteredAppointments.filter(
      (a) => a.status === 'En Proceso'
    );

    const waitingA = filteredAppointments.filter(
      (a) => a.status === 'Esperando Actualización'
    );
    const doneA = filteredAppointments.filter((a) => a.status === 'Realizado');
    const pendingA = filteredAppointments.filter(
      (a) => a.status === 'Pendiente'
    );

    const arrays = [pendingA, waitingA, inProcessA, redAppointments, doneA];

    setAppointments(arrays.filter((a) => a.length !== 0));
  };

  const admissionFunction = (appointment: Appointment) => {
    setActualAppointment(appointment);
    openAdmissionModal();
  };

  const cancelFunction = (appointment: Appointment) => {
    setActualAppointment(appointment);
    openCancelModal();
  };

  const absenceFunction = (appointment: Appointment) => {
    setActualAppointment(appointment);
    openAbsenceModal();
  };

  const notDoneFunction = (appointment: Appointment) => {
    setActualAppointment(appointment);
    openNotDoneModal();
  };

  const doneFunction = (appointment: Appointment) => {
    setActualAppointment(appointment);
    openDoneModal();
  };
  const Accordions = appointments
    .filter((a) => a && a.length !== 0)
    .map((a) => (
      <StatusTable
        key={`appointment-${a![0].ID_appointment}`} // prefijo para evitar duplicados
        appointments={a ? a : []}
        buttonFunctions={{
          absenceFunction,
          admissionFunction,
          cancelFunction,
          notDoneFunction,
          doneFunction
        }}
      />
    ));

  const handleOnSetStatus = async (
    status: string,
    closeFunction: () => void,
    observations?: string,
    reason?: string
  ) => {
    if (!actualAppointment) return;
    await editStatus(
      actualAppointment.ID_appointment,
      status,
      observations,
      reason
    );
    closeFunction();
    await fetchAppointments();
  };

  useEffect(() => {
    fetchAppointments();
  }, [form.values]);

  // useEffect(() => console.log(appointments), [appointments]);
  // useEffect(() => console.log(actualAppointment), [actualAppointment]);
  return (
    <Flex h={'100%'} direction={'row'} gap={'lg'}>
      <AbsenceModal
        absenceModal={absenceModal}
        closeAbsenceModal={closeAbsenceModal}
        handleOnSetStatus={handleOnSetStatus}
        fetch={fetchAppointments}
      />
      <CanceledModal
        cancelModal={cancelModal}
        closeCancelModal={closeCancelModal}
        handleOnSetStatus={handleOnSetStatus}
        actualAppointement={actualAppointment}
        fetch={fetchAppointments}
      />
      <AdmissionModal
        admissionModal={admissionModal}
        closeAdmissionModal={closeAdmissionModal}
        actualAppointment={actualAppointment}
        fetch={fetchAppointments}
      />
      <NotDoneModal 
        actualAppointement={actualAppointment}
        notDoneModal={notDoneModal}
        closeNotDoneModal={closeNotDoneModal}
        handleOnSetStatus={handleOnSetStatus}
        fetch={fetchAppointments}
      />
      <DoneModal
        doneModal={doneModal}
        closeDoneModal={closeDoneModal}
        actualAppointment={actualAppointment}
        fetch={fetchAppointments}
      />
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
        <Accordion variant="contained" classNames={{ panel: styles.row }}>
          {Accordions}
        </Accordion>
      </Box>
    </Flex>
  );
}

export default IncomeForm;
