import { ActionIcon, Table, Tooltip } from '@mantine/core';
import styles from './appoinment-row.module.css';
import { Appoinment } from '../../filter/filter-appoinments';
import { useContext } from 'react';
import { AppoinmentContext } from '../../../../../contexts/appoinment-context';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MainColorContext } from '../../../../../contexts/color-context';

interface props{
  clickFunction: () => void,
  appoinment: Appoinment,

}
export function AppoinmentRow({appoinment, clickFunction}: props) {
  const convertedDate = new Date(appoinment.date);
  const formattedDate = new Intl.DateTimeFormat('es-AR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(convertedDate);

  const formattedTime = new Intl.DateTimeFormat('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(convertedDate);

  const canEdit =
    appoinment.status === 'Pendiente' ||
    appoinment.status === 'Esperando Actualización'
      ? false
      : true;

  const tooltipLabel = canEdit
    ? `No puede editar este registro.`
    : 'Editar Registro';
  const twoNames = appoinment.owner.split(',');
  const canDelete = appoinment.status === 'Pendiente' ? false : true;
  const deleteLabel = !canDelete ? 'Borrar' : 'No puede borrar este registro';

  const mainColor = useContext(MainColorContext);
  const navigate = useNavigate();
  return (
    <Table.Tr style={{ maxHeight: '50px' }} key={appoinment.ID_appoinment}>
      <Table.Td>{formattedDate}</Table.Td>
      <Table.Td>{formattedTime}</Table.Td>
      <Table.Td>{twoNames[0]}</Table.Td>
      <Table.Td>{twoNames[1]}</Table.Td>
      <Table.Td>{appoinment.dni}</Table.Td>
      <Table.Td>{appoinment.home}</Table.Td>
      <Table.Td>{appoinment.phone}</Table.Td>
      <Table.Td>{appoinment.neighborhood}</Table.Td>
      <Table.Td>{appoinment.race}</Table.Td>
      <Table.Td>{appoinment.sex}</Table.Td>
      <Table.Td>{appoinment.size}</Table.Td>
      <Table.Td>{appoinment.status}</Table.Td>
      <Table.Td c={appoinment.reason ? '#000' : '#aaaa'}>
        {appoinment.reason ? appoinment.reason : 'Sin Razon'}
      </Table.Td>
      <Table.Td>
        <Tooltip label={tooltipLabel}>
          <ActionIcon
            onClick={() => {
              navigate(`/turnos/editar/${appoinment.ID_appoinment}`);
            }}
            color={mainColor}
            disabled={canEdit}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </ActionIcon>
        </Tooltip>
      </Table.Td>
      <Table.Td>
        <Tooltip label={deleteLabel}>
          <ActionIcon
            onClick={clickFunction}
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
