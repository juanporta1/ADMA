// Componente para renderizar una fila de la tabla de turnos con acciones de editar y borrar
import { ActionIcon, Table, TableTd, Text, Tooltip } from '@mantine/core';
import { Appointment } from '../../../../types/entities.types';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { MainColorContext } from '../../../../contexts/color-context';
import useDataEntities from '../../../../hooks/general/use-data-entities/use-data-entities';
import { UserContext } from '../../../../contexts/user-context';

interface props {
  clickSeeFeaturesFunc: () => void;
  clickSeeObservationFunc: () => void;
  appointment: Appointment;
}

// Renderiza una fila de turno con botones de editar y borrar, según el estado del turno
export function CastrationRow({
  appointment,
  clickSeeObservationFunc,
  clickSeeFeaturesFunc,
}: props) {
  // Determina si se puede borrar el turno
  const canDelete = appointment.status === 'Pendiente' ? false : true;
  const deleteLabel = !canDelete ? 'Borrar' : 'No puede borrar este registro';
  const featuresLabel = appointment.castration?.features
    ? 'Ver características'
    : 'Este registro no tiene características';
  const observationLabel = appointment.castration?.observations
    ? 'Ver observaciones'
    : 'Este registro no tiene observaciones';
  const mainColor = useContext(MainColorContext);
  const { currentUser } = useContext(UserContext);
  return (
    <Table.Tr key={appointment.ID_appointment}>
      <Table.Td>{appointment.surgeryNumber}</Table.Td>
      <Table.Td>{appointment.date.toString()}</Table.Td>
      <Table.Td>{appointment.hour}</Table.Td>
      <Table.Td>{appointment.lastName}</Table.Td>
      <Table.Td>{appointment.dni}</Table.Td>

      <Table.Td>{appointment.home}</Table.Td>
      <Table.Td>{appointment.neighborhood.neighborhood}</Table.Td>
      <Table.Td>{appointment.specie.specie}</Table.Td>
      <Table.Td>{appointment.sex}</Table.Td>
      <Table.Td>{appointment.size}</Table.Td>
      <Table.Td>{appointment.castration?.animalName}</Table.Td>
      <Table.Td>{appointment.castration?.weight}KG</Table.Td>
      <Table.Td>{appointment.castration?.age}</Table.Td>

      {/* Botón para editar el turno */}
      <Table.Td>
        <Tooltip label={featuresLabel}>
          <ActionIcon
            onClick={clickSeeFeaturesFunc}
            color={mainColor}
            disabled={appointment.castration?.features ? false : true}
          >
            <FontAwesomeIcon icon={faComment} />
          </ActionIcon>
        </Tooltip>
      </Table.Td>
      <Table.Td>
        <Tooltip label={observationLabel}>
          <ActionIcon
            onClick={clickSeeObservationFunc}
            color={mainColor}
            disabled={appointment.castration?.observations ? false : true}
          >
            <FontAwesomeIcon icon={faComment} />
          </ActionIcon>
        </Tooltip>
      </Table.Td>
    </Table.Tr>
  );
}

export default CastrationRow;
