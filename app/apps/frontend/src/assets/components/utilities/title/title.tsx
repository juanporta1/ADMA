import { Text } from '@mantine/core';
import styles from './title.module.css';

interface props{
  text: string
}
export function Title(props: props) {
  return (
    <Text fw={700} c="#66355d" size='30px' >{props.text}</Text>
  );
}

export default Title;
