import { Box, Button, Flex, Grid, Text, TextInput } from '@mantine/core';
import styles from './create-appoinment.module.css';

import { useForm } from '@mantine/form';
import Title from '../../utilities/title/title';

export function CreateAppoinment() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      lastName: '',
      name: '',
    },
  });

  return (
    <Flex justify="center" align="center" direction={'row'}>
      <form action="">
        <Grid mt="lg" p="sm">
          <Grid.Col span={12}>
            <Title text="Cargar Turno" c=''/>
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              key={form.key('lastName')}
              {...form.getInputProps('lastName')}
              placeholder="Ingrese el Apellido"
              label="Apellido:"
            />
          </Grid.Col>
          <Grid.Col span={6}>
          <TextInput
              key={form.key('name')}
              {...form.getInputProps('name')}
              placeholder="Ingrese el Nombre"
              label="Nombre:"
            />
          </Grid.Col>
        </Grid>
      </form>
    </Flex>
  );
}

export default CreateAppoinment;
