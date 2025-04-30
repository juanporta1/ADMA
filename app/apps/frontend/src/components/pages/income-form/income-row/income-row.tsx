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
  buttonFunctions: ButtonFunctions;
}

export interface ExtraColumns {
  surgeryNumber?: React.ReactNode;
  weight?: React.ReactNode;
  age?: React.ReactNode;
  animalName?: React.ReactNode;
  status?: React.ReactNode;
  reason?: React.ReactNode;
}

export interface Buttons {
  button1?: React.ReactNode;
  button2?: React.ReactNode;
  button3?: React.ReactNode;
}

export interface ButtonFunctions{
  absenceFunction?: (appointment: Appointment) => void;
  cancelFunction?: (appointment: Appointment) => void;
  admissionFunction?: (appointment: Appointment) => void;
}

export function IncomeRow({ appointment , buttonFunctions }: props) {
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
    }else if(['Cancelado', 'No Realizado', 'Ausentado'].includes(appointment.status)){
      return {
        status: <Table.Td>{appointment.status}</Table.Td>,
        reason: <Table.Td>{appointment.reason?.reason || "-"}</Table.Td>,
      };
    }
  };
  const {buttons} = useIncomeData({appointment, buttonFunctions})
 
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
      {extraColumns()?.status}
      {extraColumns()?.reason}
      {buttons()?.button1}
      {buttons()?.button2}
      {buttons()?.button3}
    </Table.Tr>
  );
}

export default IncomeRow;
