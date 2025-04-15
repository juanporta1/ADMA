// Componente simple para mostrar un título estilizado
import { Text } from '@mantine/core';
import styles from './title.module.css';

interface props {
  text: string;
  c: string;
}
export function Title(props: props) {
  return (
    <Text fw={700} c={props.c} size="30px">
      {props.text}
    </Text>
  );
}

export default Title;
