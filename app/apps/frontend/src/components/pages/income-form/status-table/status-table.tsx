import { Accordion, Table } from '@mantine/core';
import styles from './status-table.module.css';
import { Appointment } from '../../appointment/filter/filter-appointments';
import IncomeRow from '../income-row/income-row';

interface props {
  appointments: Appointment[];
}
export function StatusTable({ appointments }: props) {

  const Rows = appointments.map((a) => <IncomeRow appointment={a} />)
  return (
    <Accordion.Item value={appointments[0].status}>
      <Accordion.Control>
        {appointments[0].status}
      </Accordion.Control>
      <Accordion.Panel>


        <Table>
          <Table.Thead display={"none"}>
            <Table.Tr>
              <Table.Td>N° de Cirugia</Table.Td>
              <Table.Td>Apellido</Table.Td>
              <Table.Td>Nombre</Table.Td>
              <Table.Td>Domicilio</Table.Td>
              <Table.Td>Teléfono</Table.Td>
              <Table.Td>Nombre del Paciente</Table.Td>
              <Table.Td>Edad</Table.Td>
              <Table.Td>Especie</Table.Td>
              <Table.Td>Sexo</Table.Td>
              <Table.Td>Peso</Table.Td>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {Rows}
          </Table.Tbody>
        </Table>
      </Accordion.Panel>
    </Accordion.Item>
  );
}

export default StatusTable;
