import { UseFormReturnType } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useEffect, useRef, useState } from 'react';
import { DateValue } from '@mantine/dates';
import { Appointment } from '../../../../../types/entities.types';
import useAppointment from '../../../../../hooks/appointment/use-appointment/use-appointment';
import FormColumn from '../../../../utilities/form-column/form-column';
import useSettings from '../../../../../hooks/settings/use-settings/use-settings';
import { SelectData } from '../../../../../types/utilities.types';
import { register } from 'module';
interface props {
  dateValue: DateValue;
  form: UseFormReturnType<any>;
  registerId?: number;
}
export function HourSelect(props: props) {
  const { countPerDay, filter } = useAppointment();
  const lastNotification = useRef<string | null>(null);
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const { getSetting } = useSettings();
  const [maxAppointments, setMaxAppointments] = useState(0);
  const hours = ['8:00', '10:00', '12:00'];
  const [selectData, setSelectsData] = useState<SelectData[]>([
    { value: '8:00', text: '8:00', disabled: true },
    { value: '10:00', text: '10:00', disabled: true },
    { value: '12:00', text: '12:00', disabled: true },
  ]);
  const getCounts = async (date: string) => {
    const counts = await countPerDay(date);
    setCounts(counts);
  };
  const getMaxAppointments = async () => {
    if (props.registerId) {
      const appointment = await filter({ id: props.registerId });
      setAppointment(appointment ? appointment[0] : null);
    }
    const maxAppointments = await getSetting('maxAppointmentsPerDay');
    if (maxAppointments.length == 0) return;
    if (!maxAppointments[0].settingIntValue) return;
    setMaxAppointments(maxAppointments[0].settingIntValue);
  };

  useEffect(() => {
    if (!props.dateValue) return;
    const stringDate = `${props.dateValue.getFullYear()}-${
      props.dateValue.getMonth() + 1
    }-${props.dateValue.getDate()}`;
    getCounts(stringDate);
  }, [props.dateValue]);

  useEffect(() => {
    getMaxAppointments();
  }, []);

  useEffect(() => {
    if (
      !props.dateValue ||
      maxAppointments === 0 ||
      Object.keys(counts).length === 0 ||
      (props.registerId !== undefined && !appointment)
    )
      return;

    const monthNumber =
      props.dateValue.getMonth() + 1 < 10
        ? '0' + (props.dateValue.getMonth() + 1)
        : props.dateValue.getMonth() + 1;
    const date = `${props.dateValue.getFullYear()}-${monthNumber}-${props.dateValue.getDate()}`;
    const selects: SelectData[] = [
      { value: '8:00', text: '8:00', disabled: true },
      { value: '10:00', text: '10:00', disabled: true },
      { value: '12:00', text: '12:00', disabled: true },
    ];

    if (!props.registerId) {
      if (counts) {
        hours.forEach((hour, i) => {
          if (counts[hour] < maxAppointments) selects[i].disabled = false;
        });
      }
    } else {
      if (counts) {
        if (!appointment) return;

        hours.forEach((hour, i) => {
          if (
            counts[hour] < maxAppointments ||
            (appointment.date === date && appointment.hour === hour)
          )
            selects[i].disabled = false;
        });
      }
    }
    setSelectsData(selects);
    if (lastNotification.current === date) return;

    if (selects.every((s) => s.disabled)) {
      notifications.show({
        title: `No hay horarios disponibles el ${date}`,
        message: 'No hay horarios disponibles para la fecha seleccionada',
        color: 'red',
      });
      lastNotification.current = date;
    } else if (selects.some((s) => s.disabled)) {
      notifications.show({
        title: `Algunos horarios del ${date} no están disponibles`,
        message: 'Hay horarios no disponibles para la fecha seleccionada',
        color: 'yellow',
      });
      lastNotification.current = date;
    }
  }, [counts, appointment, maxAppointments]);

  return (
    <FormColumn
      form={props.form}
      inputType="select"
      name="hour"
      label="Hora: "
      span={4}
      data={[
        { value: '', text: 'Seleccionar un horario', disabled: true },
        ...selectData,
      ]}
    />
  );
}

export default HourSelect;
