// Componente para renderizar una fila de la tabla de turnos con acciones de editar y borrar
import { ActionIcon, Table, Text, Tooltip } from '@mantine/core';
import { Appoinment } from '../../filter/filter-appoinments';
import { useContext } from 'react';
 
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { MainColorContext } from '../../../../../contexts/color-context';

interface props{
  clickDeleteFunc: () => void,
  clickEditFunc: () => void,
  clickSeeObservationFunc: () => void,
  appoinment: Appoinment,
}

// Renderiza una fila de turno con botones de editar y borrar, según el estado del turno
export function AppoinmentRow({appoinment, clickDeleteFunc, clickEditFunc, clickSeeObservationFunc}: props) {
  
  // Determina si se puede editar el turno según su estado
  const canEdit =
    appoinment.status === 'Pendiente' ||
    appoinment.status === 'Esperando Actualización'
      ? false
      : true;

  // Etiqueta del tooltip para el botón de editar
  const tooltipLabel = canEdit
    ? `No puede editar este registro.`
    : 'Editar Registro';
  // Separa el nombre y apellido del dueño
  const twoNames = appoinment.owner.split(',');
  // Determina si se puede borrar el turno
  const canDelete = appoinment.status === 'Pendiente' ? false : true;
  const deleteLabel = !canDelete ? 'Borrar' : 'No puede borrar este registro';
  const observationLabel = appoinment.observations ? "Ver observaciones" : 'Este registro no tiene observaciones';
  const mainColor = useContext(MainColorContext);
  
  return (
    <Table.Tr  key={appoinment.ID_appoinment} mah={"60px"} mih={"50px"}>
      <Table.Td>{appoinment.date.toString()}</Table.Td>
      <Table.Td>{appoinment.hour}</Table.Td>
      <Table.Td>{twoNames[0]}</Table.Td>
      <Table.Td>{twoNames[1]}</Table.Td>
      <Table.Td>{appoinment.dni}</Table.Td>
      <Table.Td>{appoinment.phone ? appoinment.phone : <Text c={"#aaaa"}>Sin Teléfono</Text>}</Table.Td>
      <Table.Td>{appoinment.home}</Table.Td>
      <Table.Td>{appoinment.neighborhood}</Table.Td>
      <Table.Td>{appoinment.specie}</Table.Td>
      <Table.Td>{appoinment.sex}</Table.Td>
      <Table.Td>{appoinment.size}</Table.Td>
      <Table.Td>{appoinment.status}</Table.Td>
      <Table.Td c={appoinment.reason ? '#000' : '#aaaa'}>
        {appoinment.reason ? appoinment.reason : 'Sin Razon'}
      </Table.Td>
      {/* Botón para editar el turno */}
      <Table.Td>
        <Tooltip label={observationLabel}>
          <ActionIcon
            onClick={clickSeeObservationFunc}
            color={mainColor}
            disabled={appoinment.observations? false : true}
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

export default AppoinmentRow;
