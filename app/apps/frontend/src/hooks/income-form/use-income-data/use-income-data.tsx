import { useState, useCallback } from 'react';
import { ButtonFunctions, Buttons } from '../../../components/pages/income-form/income-row/income-row';
import { Table, Button, ActionIcon, Tooltip } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Appointment } from '../../../components/pages/appointment/filter/filter-appointments';
import {
  faBan,
  faCircleCheck,
  faPersonCircleQuestion,
} from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseIncomeData {
  buttons: () => Buttons | void;
}
export interface UseIncomeDataProps {
  appointment: Appointment;
  buttonFunctions: ButtonFunctions
}

export function useIncomeData({
  appointment,
  buttonFunctions
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
              ><FontAwesomeIcon icon={faCircleCheck} />
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
              ><FontAwesomeIcon icon={faBan} />
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
              ><FontAwesomeIcon icon={faPersonCircleQuestion} />
              </ActionIcon>
            </Tooltip>
          </Table.Td>
        ),
      };
    }
  };
  return { buttons };
}

export default useIncomeData;
