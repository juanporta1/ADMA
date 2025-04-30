import { useState, useCallback } from 'react';
import { Buttons } from '../../../components/pages/income-form/income-row/income-row';
import { Table, Button } from '@mantine/core';
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
  setAppointment: React.Dispatch<React.SetStateAction<Appointment | null>>;
  openAdmissionModal?: () => void;
  openCancelModal?: () => void;
  openAbsenceModal?: () => void;
}

export function useIncomeData({
  appointment,
  setAppointment,
  openAbsenceModal,
  openAdmissionModal,
  openCancelModal,
}: UseIncomeDataProps): UseIncomeData {
  const buttons = (): Buttons | void => {
    if (['Esperando Actualización'].includes(appointment.status)) {
      return {
        button1: (
          <Table.Td>
            <Button
              color="green"
              leftSection={<FontAwesomeIcon icon={faCircleCheck} />}
              size="compact-md"
              onClick={() => {
                openAdmissionModal?.();
                setAppointment(appointment);
              }}
            >
              Admitido
            </Button>
          </Table.Td>
        ),
        button2: (
          <Table.Th>
            <Button
              color="red"
              leftSection={<FontAwesomeIcon icon={faBan} />}
              size="compact-md"
              onClick={() => {
                openCancelModal?.();
                setAppointment(appointment);
              }}
            >
              Cancelado
            </Button>
          </Table.Th>
        ),
        button3: (
          <Table.Th>
            <Button
              color="gray"
              leftSection={<FontAwesomeIcon icon={faPersonCircleQuestion} />}
              size="compact-md"
              onClick={() => {
                openAbsenceModal?.();
                setAppointment(appointment);
              }}
            >
              Ausentado
            </Button>
          </Table.Th>
        ),
      };
    }
  };
  return { buttons };
}

export default useIncomeData;
