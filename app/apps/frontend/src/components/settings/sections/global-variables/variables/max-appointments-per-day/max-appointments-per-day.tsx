import { Button, Flex, Text, TextInput, Title } from '@mantine/core';
import styles from './max-appointments-per-day.module.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { SettingsContext } from '../../../../../../contexts/settings-context';
import useSettings from '../../../../../../hooks/settings/use-settings/use-settings';
import { UserContext } from '../../../../../../contexts/user-context';
import { MainColorContext } from '../../../../../../contexts/color-context';

export function MaxAppointmentsPerDay() {
  const { maxAppointmentsPerDayList } = useContext(SettingsContext);
  const [maxAppointmentsPerDay, setMaxAppointmentsPerDay] =
    maxAppointmentsPerDayList;
  const [inputValue, setInputValue] = useState<number>(0);
  const { currentUser } = useContext(UserContext);
  const mainColor = useContext(MainColorContext);
  const { getSetting, updateSetting } = useSettings();
  const input = useRef<HTMLInputElement>(null);
  const getValue = async () => {
    const values = await getSetting('maxAppointmentsPerDay');
    if (values.length == 0)
      return console.log('No se encontro MaxAppointmentsPerDay');
    if (values[0].settingIntValue == null)
      return console.log(
        'MaxAppointmentsPerDay no tiene valor en settinIntValue'
      );
    setMaxAppointmentsPerDay(values[0].settingIntValue);
    setInputValue(values[0].settingIntValue);
  };

  const updateValue = async () => {
    if (currentUser?.role!=='main') return;
    if (inputValue === maxAppointmentsPerDay) return;
    if (inputValue === 0) return;
    await updateSetting({settingName: 'maxAppointmentsPerDay', settingIntValue: inputValue});
    getValue();
  };

  useEffect(() => {
    getValue();
  }, []);
  useEffect(() => {
    console.log(maxAppointmentsPerDay);
  }, [maxAppointmentsPerDay]);
  return (
    <Flex direction={'column'} gap={'sm'} justify={'center'} align={'start'}>
      <Title order={2}>Cantidad Máxima de Turnos por Día</Title>
      <Text>
        Este valor controla el numero total de turnos que pueden dar los usuarios
        no main en cualquier día en un horario en especifico.
      </Text>
      <TextInput
        ref={input}
        value={inputValue}
        onChange={(e) => {
          if (!/^\d*$/.test(e.currentTarget.value)) return;
          if (e.target.value == '') return setInputValue(0);
          setInputValue(parseInt(e.target.value));
        }}
        disabled={currentUser?.role !== 'main'}
      />
      <Text
        size="sm"
        display={inputValue === maxAppointmentsPerDay ? 'none' : 'inline'}
      >
        Valor actual: {maxAppointmentsPerDay}
      </Text>
      <Button
        color={mainColor}
        disabled={
          currentUser?.role !== 'main' || inputValue === maxAppointmentsPerDay || inputValue === 0
        }
        onClick={updateValue}
      >
        Actualizar Valor
      </Button>
    </Flex>
  );
}

export default MaxAppointmentsPerDay;
