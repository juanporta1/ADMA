import { Table } from '@mantine/core';
import { Appointment } from '../../appointment/filter/filter-appointments';


interface props {
  appointment: Appointment;
}
export function IncomeRow({ appointment }: props) {
  

  return (
    <Table.Tr>
      <Table.Td>{appointment.surgeryNumber || "-"}</Table.Td>
      <Table.Td>{appointment.lastName}</Table.Td>
      <Table.Td>{appointment.name}</Table.Td>
      <Table.Td>{appointment.home}</Table.Td>
      <Table.Td>{appointment.phone || "-"}</Table.Td>
      <Table.Td>{appointment.incomeForm?.animalName || "-"}</Table.Td>
      <Table.Td>{appointment.incomeForm?.age || "-"}</Table.Td>
      <Table.Td>{appointment.specie.specie}</Table.Td>
      <Table.Td>{appointment.sex}</Table.Td>
      <Table.Td>{appointment.incomeForm?.weight || "-"}</Table.Td>
    </Table.Tr>
  );
}

export default IncomeRow;
