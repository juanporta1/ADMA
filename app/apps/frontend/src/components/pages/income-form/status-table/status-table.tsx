import { Accordion, Table } from '@mantine/core';
import styles from './status-table.module.css';
import { Appointment } from '../../appointment/filter/filter-appointments';
import IncomeRow from '../income-row/income-row';
import {
  FontawesomeObject,
  IconDefinition,
} from '@fortawesome/fontawesome-svg-core';
import {
  faBan,
  faClock,
  faHourglass,
  faSquareCheck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface props {
  appointments: Appointment[]; // agregar tipado de dat
}
export function StatusTable({ appointments }: props) {
  const Rows = appointments.map((a, i) => (
    <IncomeRow key={a.ID_appointment} appointment={a} />
  ));

  const statusType = appointments[0].status;

  let bgColor: string;
  let title: string | null = null;
  let icon: IconDefinition;
  if (appointments[0].status === 'Esperando Actualización') {
    bgColor = '#fcfc14aa';
    icon = faHourglass;
  } else if (
    ['Cancelado', 'No Realizado', 'Ausentado'].includes(appointments[0].status)
  ) {
    bgColor = '#d92f0daa';
    title = 'Cancelados, Ausentados y No Realizados';
    icon = faBan;
  } else if (appointments[0].status === 'Realizado') {
    bgColor = '#33d45eaa';
    icon = faSquareCheck;
  } else {
    bgColor = '#fff'
    icon = faClock;
  }
  return (
    <Accordion.Item value={appointments[0].status}>
      <Accordion.Control bg={bgColor} icon={<FontAwesomeIcon icon={icon}/>}>
        Turnos en estado {title || appointments[0].status}
      </Accordion.Control>
      <Accordion.Panel className={styles.row}>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>N° de Cirugia</Table.Th>
              <Table.Th>Apellido</Table.Th>
              <Table.Th>Nombre</Table.Th>
              <Table.Th>Domicilio</Table.Th>
              <Table.Th>Teléfono</Table.Th>
              <Table.Th>Nombre del Paciente</Table.Th>
              <Table.Th>Edad</Table.Th>
              <Table.Th>Especie</Table.Th>
              <Table.Th>Sexo</Table.Th>
              <Table.Th>Peso</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{Rows}</Table.Tbody>
        </Table>
      </Accordion.Panel>
    </Accordion.Item>
  );
}

export default StatusTable;
