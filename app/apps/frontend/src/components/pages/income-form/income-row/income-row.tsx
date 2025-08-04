import { Table } from '@mantine/core';
import React from 'react';

import useIncomeData from '../../../../hooks/income-form/use-income-data/use-income-data';
import { Appointment } from '../../../../types/entities.types';
import { Veterinarian } from '../../../../types/data-entities.types';

interface props {
  appointment: Appointment;
  buttonFunctions: ButtonFunctions;
  veterinarian?: Veterinarian | null;
}

export interface ExtraColumns {
  surgeryNumber?: React.ReactNode;
  weight?: React.ReactNode;
  age?: React.ReactNode;
  animalName?: React.ReactNode;
  status?: React.ReactNode;
  reason?: React.ReactNode;
  veterinarian?: React.ReactNode;
}

export interface Buttons {
  button1?: React.ReactNode;
  button2?: React.ReactNode;
  button3?: React.ReactNode;
}

export interface ButtonFunctions {
  absenceFunction?: (appointment: Appointment) => void;
  cancelFunction?: (appointment: Appointment) => void;
  admissionFunction?: (appointment: Appointment) => void;
  notDoneFunction?: (appointment: Appointment) => void;
  doneFunction?: (appointment: Appointment) => void;
}

export function IncomeRow({ appointment, buttonFunctions }: props) {
  const { buttons, extraColumns } = useIncomeData({
    appointment,
    buttonFunctions,
  });

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
      <Table.Td>{appointment.mobile ? 'Sí' : 'No'}</Table.Td>

      {extraColumns()?.weight}
      {extraColumns()?.status}
      {extraColumns()?.reason}
      {extraColumns()?.veterinarian}

      {buttons()?.button1}
      {buttons()?.button2}
      {buttons()?.button3}
    </Table.Tr>
  );
}

export default IncomeRow;
