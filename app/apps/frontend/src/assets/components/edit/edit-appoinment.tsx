import { useEffect, useState } from 'react';
import styles from './edit-appoinment.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Fieldset, Grid, NativeSelect, Text, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';

class Appoinment {
  ID_appoinment!: number;
  owner!: string;
  home!: string;
  neighborhood!: string;
  phone!: string;
  dni!: string;
  date!: Date;
  size!: 'Grande' | 'Pequeño' | 'Mediano';
  sex!: 'Macho' | 'Hembra';
  race!: 'Canino' | 'Felino';
  status!:
    | 'Pendiente'
    | 'Cancelado'
    | 'Ausentado'
    | 'Realizado'
    | 'Esperando Actualización';
}
export function EditAppoinment() {
  const { id } = useParams();
  const [appoinment, setAppoinment] = useState<Appoinment>();
  useEffect(() => {
    try {
      axios
        .get(`http://localhost:3000/api/appoinment`, {
          params: {
            id,
          },
        })
        .then((res) => {
          setAppoinment(res.data);
          console.log(res.data);
        });
    } catch (err) {
      throw err;
    }
  }, []);

  return (
    <div className={styles.main}>
      <Fieldset>
        <Grid>
          <Grid.Col span={12}>
            <Text fw={700} c="#66355d" size="25px">
              Editar Turno
            </Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput label="Apellido" placeholder="Ingrese el Apellido" />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput label="Nombre" placeholder="Ingrese el Nombre" />
          </Grid.Col>
          <Grid.Col span={6}></Grid.Col>
          <TextInput label="DNI" placeholder='Ingrese el DNI' />
          <Grid.Col span={6}>
          <TextInput label="Teléfono" placeholder='Ingrese el Teléfono' />
          </Grid.Col>
          <Grid.Col span={6}>
            <DatePickerInput label="Fecha" placeholder='Ingrese una Fecha'/>
          </Grid.Col>
          <Grid.Col span={6}>
            <NativeSelect>
              <option value="eight">8:00</option>
              <option value="ten">10:00</option>
              <option value="twelve">12:00</option>

            </NativeSelect>
          </Grid.Col>
          <Grid.Col span={6}></Grid.Col>
          <Grid.Col span={6}></Grid.Col>
          <Grid.Col span={6}></Grid.Col>
          <Grid.Col span={6}></Grid.Col>
        </Grid>
      </Fieldset>
    </div>
  );
}

export default EditAppoinment;
