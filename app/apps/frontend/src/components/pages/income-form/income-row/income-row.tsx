import { Button, Table } from '@mantine/core';
import { Appointment } from '../../appointment/filter/filter-appointments';


interface props {
  appointment: Appointment;
}
export function IncomeRow({ appointment }: props) {
  
  const extraColumns = () => {
    if(["En Proceso", "Realizado"].includes(appointment.status)){
      return {
        surgeryNumber: <Table.Th>{appointment.surgeryNumber}</Table.Th>,
        weight: <Table.Th>{appointment.incomeForm?.weight || "-"}</Table.Th>,
        age: <Table.Th>{appointment.incomeForm?.age || "-"}</Table.Th>,
        animalName: <Table.Th>{appointment.incomeForm?.animalName || "-"}</Table.Th>
      }
    }
  }
  const buttons = () => {
    if(["Esperando Actualización"].includes(appointment.status)){
      return {
        inProcess: <Table.Td><Button>Admitido</Button></Table.Td>,
        cancel: <Table.Th>Cancelar</Table.Th>
      }
    }
  }
  return (
    <Table.Tr>
      {extraColumns()?.surgeryNumber}
      <Table.Td>{appointment.lastName}</Table.Td>
      <Table.Td>{appointment.name}</Table.Td>
      <Table.Td>{appointment.home}</Table.Td>
      <Table.Td>{appointment.phone || "-"}</Table.Td>
      {extraColumns()?.animalName}
      {extraColumns()?.age}
      <Table.Td>{appointment.specie.specie}</Table.Td>
      <Table.Td>{appointment.sex}</Table.Td>
      {extraColumns()?.weight}
    </Table.Tr>
  );
}

export default IncomeRow;
