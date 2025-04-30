import { Button, Table } from '@mantine/core';
import { Appointment } from '../../appointment/filter/filter-appointments';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import {
  faBan,
  faPersonCircleQuestion,
} from '@fortawesome/free-solid-svg-icons';
import useIncomeData from '../../../../hooks/income-form/use-income-data/use-income-data';

interface props {
  appointment: Appointment;
  setActualAppointment: React.Dispatch<React.SetStateAction<Appointment | null>>;
  buttonFunctions?: ButtonFunctions;
}

export interface ExtraColumns {
  surgeryNumber?: React.ReactNode;
  weight?: React.ReactNode;
  age?: React.ReactNode;
  animalName?: React.ReactNode;
}

export interface Buttons {
  button1?: React.ReactNode;
  button2?: React.ReactNode;
  button3?: React.ReactNode;
}

export interface ButtonFunctions{
  openAbsenceModal?: () => void;
  openCancelModal?: () => void;
  openAdmissionModal?: () => void;
}

export function IncomeRow({ appointment,setActualAppointment, buttonFunctions }: props) {
  const extraColumns = (): ExtraColumns | void => {
    if (['En Proceso', 'Realizado'].includes(appointment.status)) {
      return {
        surgeryNumber: <Table.Th>{appointment.surgeryNumber}</Table.Th>,
        weight: <Table.Th>{appointment.incomeForm?.weight || '-'}</Table.Th>,
        age: <Table.Th>{appointment.incomeForm?.age || '-'}</Table.Th>,
        animalName: (
          <Table.Th>{appointment.incomeForm?.animalName || '-'}</Table.Th>
        ),
      };
    } else if (['Esperando Actualización'].includes(appointment.status)) {
      return {
        surgeryNumber: <Table.Th>{appointment.surgeryNumber}</Table.Th>,
      };
    }
  };
  const {buttons} = useIncomeData({appointment, setAppointment: setActualAppointment, ...buttonFunctions})
 
  return (
    <Table.Tr>
      {extraColumns()?.surgeryNumber}
      <Table.Td>{appointment.lastName}</Table.Td>
      <Table.Td>{appointment.name}</Table.Td>
      <Table.Td>{appointment.home}</Table.Td>
      <Table.Td>{appointment.phone || '-'}</Table.Td>
      {extraColumns()?.animalName}
      {extraColumns()?.age}
      <Table.Td>{appointment.specie.specie}</Table.Td>
      <Table.Td>{appointment.sex}</Table.Td>
      {extraColumns()?.weight}
      {buttons()?.button1}
      {buttons()?.button2}
      {buttons()?.button3}
    </Table.Tr>
  );
}

export default IncomeRow;
