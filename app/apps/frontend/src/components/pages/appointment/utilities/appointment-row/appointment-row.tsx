// Componente para renderizar una fila de la tabla de turnos con acciones de editar y borrar
import { ActionIcon, Table, Text, Tooltip } from '@mantine/core';
import { Appointment } from '../../../../../types/entities.types';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { MainColorContext } from '../../../../../contexts/color-context';

interface props {
  clickDeleteFunc: () => void;
  clickEditFunc: () => void;
  clickSeeObservationFunc: () => void;
  appointment: Appointment;
}

// Renderiza una fila de turno con botones de editar y borrar, según el estado del turno
export function AppointmentRow({
  appointment,
  clickDeleteFunc,
  clickEditFunc,
  clickSeeObservationFunc,
}: props) {
  // Determina si se puede editar el turno según su estado
  const canEdit = appointment.status === 'Pendiente' ? false : true;

  // Etiqueta del tooltip para el botón de editar
  const tooltipLabel = canEdit
    ? `No puede editar este registro.`
    : 'Editar Registro';

  // Determina si se puede borrar el turno
  const canDelete = appointment.status === 'Pendiente' ? false : true;
  const deleteLabel = !canDelete ? 'Borrar' : 'No puede borrar este registro';
  const observationLabel = appointment.observations
    ? 'Ver observaciones'
    : 'Este registro no tiene observaciones';
  const mainColor = useContext(MainColorContext);

  return (
    <Table.Tr key={appointment.ID_appointment}>
      <Table.Td>{appointment.date.toString()}</Table.Td>
      <Table.Td>{appointment.hour}</Table.Td>
      <Table.Td>{appointment.lastName}</Table.Td>
      <Table.Td>{appointment.name}</Table.Td>
      <Table.Td>{appointment.dni}</Table.Td>
      <Table.Td>
        {appointment.phone ? (
          appointment.phone
        ) : (
          <Text c={'#aaaa'}>Sin Teléfono</Text>
        )}
      </Table.Td>
      <Table.Td>{appointment.home}</Table.Td>
      <Table.Td>{appointment.neighborhood.neighborhood}</Table.Td>
      <Table.Td>{appointment.specie.specie}</Table.Td>
      <Table.Td>{appointment.sex}</Table.Td>
      <Table.Td>{appointment.size}</Table.Td>
      <Table.Td>{appointment.mobile ? 'Sí' : 'No'}</Table.Td>
      <Table.Td>{appointment.status}</Table.Td>
      <Table.Td c={appointment.reason ? '#000' : '#aaaa'}>
        {appointment.reason ? appointment.reason.reason : 'Sin Razon'}
      </Table.Td>
      {/* Botón para editar el turno */}
      <Table.Td>
        <Tooltip label={observationLabel}>
          <ActionIcon
            onClick={clickSeeObservationFunc}
            color={mainColor}
            disabled={appointment.observations ? false : true}
          >
            <FontAwesomeIcon icon={faComment} />
          </ActionIcon>
        </Tooltip>
      </Table.Td>
      <Table.Td>
        <Tooltip label={tooltipLabel}>
          <ActionIcon
            onClick={clickEditFunc}
            color={mainColor}
            disabled={canEdit}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </ActionIcon>
        </Tooltip>
      </Table.Td>
      {/* Botón para borrar el turno */}
      <Table.Td>
        <Tooltip label={deleteLabel}>
          <ActionIcon
            onClick={clickDeleteFunc}
            color={mainColor}
            disabled={canEdit}
          >
            <FontAwesomeIcon icon={faTrash} />
          </ActionIcon>
        </Tooltip>
      </Table.Td>
    </Table.Tr>
  );
}

export default AppointmentRow;
