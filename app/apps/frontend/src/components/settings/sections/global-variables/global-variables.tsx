import { Center, Flex, Title } from '@mantine/core';
import styles from './global-variables.module.css';
import MaxAppointmentsPerDay from './variables/max-appointments-per-day/max-appointments-per-day';

export function GlobalVariables() {
  return (
    <Flex direction={"column"} justify={"center"} align={"start"} gap={"md"}>
      <Title >Valores Globales</Title>
      <MaxAppointmentsPerDay />
    </Flex>
  );
}

export default GlobalVariables;
