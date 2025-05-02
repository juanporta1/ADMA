import { Accordion, Table } from '@mantine/core';
import styles from './status-table.module.css';
import { Appointment } from '../../appointment/filter/filter-appointments';
import IncomeRow, {
  ButtonFunctions,
  ExtraColumns,
} from '../income-row/income-row';
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
  appointments: Appointment[];
  
  buttonFunctions: ButtonFunctions;  
}
export function StatusTable({
  appointments,
 
  buttonFunctions,
}: props) {
  const Rows = appointments.map((a, i) => (
    <IncomeRow
      key={a.ID_appointment}
      appointment={a}
      buttonFunctions={buttonFunctions}
    />
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
    title = 'Cancelado, Ausentado y No Realizado';
    icon = faBan;
  } else if (appointments[0].status === 'Realizado') {
    bgColor = '#33d45eaa';
    icon = faSquareCheck;
  } else if (appointments[0].status === 'En Proceso') {
    bgColor = '#aaaaaaaa';
    icon = faClock;
  }else {
    bgColor = '#fff';
    icon = faClock;
  }

  const extraColumns = (): ExtraColumns | void => {
    if (['En Proceso', 'Realizado'].includes(appointments[0].status)) {
      return {
        surgeryNumber: <Table.Th>N° de Cirugia</Table.Th>,
        weight: <Table.Th>Peso</Table.Th>,
        age: <Table.Th>Edad</Table.Th>,
        animalName: <Table.Th>Nombre del Paciente</Table.Th>,
      };
    } else if (['Esperando Actualización'].includes(appointments[0].status)) {
      return {
        surgeryNumber: <Table.Th>N° de Cirugia</Table.Th>,
      };
    } else if (
      ['Cancelado', 'No Realizado', 'Ausentado'].includes(
        appointments[0].status
      )
    ) {
      return {
        status: <Table.Th>Estado</Table.Th>,
        reason: <Table.Th>Razón</Table.Th>,
      };
    }
  };

  return (
    <Accordion.Item value={appointments[0].status}>
      <Accordion.Control bg={bgColor} icon={<FontAwesomeIcon icon={icon} />}>
        Turnos en estado {title || appointments[0].status}
      </Accordion.Control>
      <Accordion.Panel className={styles.row}>
        <Table>
          <Table.Thead>
            <Table.Tr>
              {extraColumns()?.surgeryNumber}
              <Table.Th>Apellido</Table.Th>
              <Table.Th>Nombre</Table.Th>
              <Table.Th>Domicilio</Table.Th>
              <Table.Th>Teléfono</Table.Th>
              {extraColumns()?.animalName}
              {extraColumns()?.age}
              <Table.Th>Especie</Table.Th>
              <Table.Th>Sexo</Table.Th>
              {extraColumns()?.weight}
              {extraColumns()?.status}
              {extraColumns()?.reason}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{Rows}</Table.Tbody>
        </Table>
      </Accordion.Panel>
    </Accordion.Item>
  );
}

export default StatusTable;
