import { useState, useCallback } from 'react';
import {
  ButtonFunctions,
  Buttons,
  ExtraColumns,
} from '../../../components/pages/income-form/income-row/income-row';
import { Table, Button, ActionIcon, Tooltip } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Appointment } from '../../../components/pages/appointment/filter/filter-appointments';
import {
  faBan,
  faCheck,
  faCircleCheck,
  faPersonCircleQuestion,
  faX,
} from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseIncomeData {
  buttons: () => Buttons | void;
  extraColumns: () => ExtraColumns | void;
}
export interface UseIncomeDataProps {
  appointment: Appointment;
  buttonFunctions: ButtonFunctions;
}

export function useIncomeData({
  appointment,
  buttonFunctions,
}: UseIncomeDataProps): UseIncomeData {
  const buttons = (): Buttons | void => {
    if (['Esperando Actualización'].includes(appointment.status)) {
      return {
        button1: (
          <Table.Td>
            <Tooltip label="Admitido">
              <ActionIcon
                color="green"
                size="md"
                onClick={() => buttonFunctions.admissionFunction?.(appointment)}
              >
                <FontAwesomeIcon icon={faCircleCheck} />
              </ActionIcon>
            </Tooltip>
          </Table.Td>
        ),
        button2: (
          <Table.Td>
            <Tooltip label="Cancelado">
              <ActionIcon
                color="red"
                size="md"
                onClick={() => buttonFunctions.cancelFunction?.(appointment)}
              >
                <FontAwesomeIcon icon={faBan} />
              </ActionIcon>
            </Tooltip>
          </Table.Td>
        ),
        button3: (
          <Table.Td>
            <Tooltip label="Ausentado">
              <ActionIcon
                color="gray"
                size="md"
                onClick={() => buttonFunctions.absenceFunction?.(appointment)}
              >
                <FontAwesomeIcon icon={faPersonCircleQuestion} />
              </ActionIcon>
            </Tooltip>
          </Table.Td>
        ),
      };
    } else if (['En Proceso'].includes(appointment.status)) {
      return {
        button1: (
          <Table.Td>
            <Tooltip label="Realizado">
              <ActionIcon
                color="green"
                size="md"
                onClick={() => buttonFunctions.doneFunction?.(appointment)}
              >
                <FontAwesomeIcon icon={faCheck} />
              </ActionIcon>
            </Tooltip>
          </Table.Td>
        ),
        button2: (
          <Table.Td>
            <Tooltip label="No Realizado">
              <ActionIcon color="red" size="md">
                <FontAwesomeIcon
                  icon={faX}
                  onClick={() => buttonFunctions.notDoneFunction?.(appointment)}
                />
              </ActionIcon>
            </Tooltip>
          </Table.Td>
        ),
        button3: (
          <Table.Td>
            <Tooltip label="Cancelado">
              <ActionIcon
                color={'gray'}
                size="md"
                onClick={() => buttonFunctions.cancelFunction?.(appointment)}
              >
                <FontAwesomeIcon icon={faBan} />
              </ActionIcon>
            </Tooltip>
          </Table.Td>
        ),
      };
    }
  };

  const extraColumns = (): ExtraColumns | void => {
    if (['En Proceso'].includes(appointment.status)) {
      return {
        surgeryNumber: <Table.Td>{appointment.surgeryNumber}</Table.Td>,
        weight: (
          <Table.Td>
            {appointment.incomeForm?.weight || '-'}{' '}
            {appointment.incomeForm?.weight ? 'KG' : ''}
          </Table.Td>
        ),
        age: <Table.Td>{appointment.incomeForm?.age || '-'}</Table.Td>,
        animalName: (
          <Table.Td>{appointment.incomeForm?.animalName || '-'}</Table.Td>
        ),
      };
    }else if (['Realizado'].includes(appointment.status)) {
      console.log(appointment);
      return {
        surgeryNumber: <Table.Td>{appointment.surgeryNumber}</Table.Td>,
        weight: (
          <Table.Td>
            {appointment.castration?.weight || '-'}{' '}
            {appointment.castration?.weight ? 'KG' : ''}
          </Table.Td>
        ),
        age: <Table.Td>{appointment.castration?.age || '-'}</Table.Td>,
        animalName: (
          <Table.Td>{appointment.castration?.animalName || '-'}</Table.Td>
        ),
      };
    } else if (['Esperando Actualización'].includes(appointment.status)) {
      return {
        surgeryNumber: <Table.Td>{appointment.surgeryNumber}</Table.Td>,
      };
    } else if (
      ['Cancelado', 'No Realizado', 'Ausentado'].includes(appointment.status)
    ) {
      return {
        status: <Table.Td>{appointment.status}</Table.Td>,
        reason: <Table.Td>{appointment.reason?.reason || '-'}</Table.Td>,
      };
    }
  };
  return { buttons, extraColumns };
}

export default useIncomeData;
