import { UseFormReturnType } from '@mantine/form';
import { NativeSelect } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { DateValue } from '@mantine/dates';
import { Appointment } from '../../../../../types/entities.types';
import { SettingsContext } from '../../../../../contexts/settings-context';
import useAppointment from '../../../../../hooks/appointment/use-appointment/use-appointment';
import { count } from 'console';
import FormColumn from '../../../../utilities/form-column/form-column';
import useSettings from '../../../../../hooks/settings/use-settings/use-settings';
import { SelectData } from '../../../../../types/utilities.types';
import { text } from 'stream/consumers';
interface props {
  dateValue: DateValue;
  form: UseFormReturnType<any>;
  registerId?: number;
}
export function HourSelect(props: props) {
  const { countPerDay } = useAppointment();
  const [counts, setCounts] = useState<Record<string, number>>({});
  const { getSetting } = useSettings()
  const [maxAppointments, setMaxAppointments] = useState(0);
  const hours = ["8:00", "10:00", "12:00"]
  const [selectData, setSelectsData] = useState<SelectData[]>([{ value: "8:00", text: "8:00", disabled: true }, { value: "10:00", text: "10:00", disabled: true }, { value: "12:00", text: "12:00", disabled: true }])
  const getCounts = async (date: string) => {
    const counts = await countPerDay(date);
    setCounts(counts);
  }
  const getMaxAppointments = async () => {
    const maxAppointments = await getSetting("maxAppointmentsPerDay");
    if (maxAppointments.length == 0) return;
    if (!maxAppointments[0].settingIntValue) return;
    setMaxAppointments(maxAppointments[0].settingIntValue);
  }

  useEffect(() => {
    if (!props.dateValue) return;
    const stringDate = `${props.dateValue.getFullYear()}-${props.dateValue.getMonth() + 1}-${props.dateValue.getDate()}`;
    getCounts(stringDate);
    console.log(stringDate);
  }, [props.dateValue])

  useEffect(() => {
    getMaxAppointments();
  }, [])
  useEffect(() => {
    const selects: SelectData[] = [{ value: "8:00", text: "8:00", disabled: false }, { value: "10:00", text: "10:00", disabled: false }, { value: "12:00", text: "12:00", disabled: false }]
    if (counts) {
      if (counts["8:00"] >= maxAppointments) selects[0].disabled = true;
      if (counts["10:00"] >= maxAppointments) selects[1].disabled = true;
      if (counts["12:00"] >= maxAppointments) selects[2].disabled = true;
    }
    if(selects.every(s => s.disabled)){
      notifications.show({
        title: "No hay horarios disponibles",
        message: "No hay horarios disponibles para la fecha seleccionada",
        color: "red",
      })
    }else if(selects.some(s => s.disabled)){
      notifications.show({
        title: "Algunos horarios no están disponibles",
        message: "Hay horarios no disponibles para la fecha seleccionada",
        color: "yellow",
      })
    }
    setSelectsData(selects);
  }, [counts])

  return (
    <FormColumn
      form={props.form}
      inputType="select"
      name="hour"
      label="Hora: "
      span={4}
      data={[{value: "", text: "Seleccionar un horario", disabled: true}, ...selectData]}
    />
  )
}



export default HourSelect;
