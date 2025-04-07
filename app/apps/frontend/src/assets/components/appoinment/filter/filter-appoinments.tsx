import {
  Box,
  Button,
  Flex,
  Grid,
  GridCol,
  NativeSelect,
  Table,
  Text,
  TextInput,
} from '@mantine/core';
import styles from './filter-appoinments.module.css';
import { DatePickerInput, DatesProvider } from '@mantine/dates';
import { useForm } from '@mantine/form';
import 'dayjs/locale/es';
import axios from 'axios';
import { useState } from 'react';

class FilterParams {
  sex?: string;
  race?: string;
  size?: string;
  neighborhood?: string;
  startDate?: Date;
  endDate?: Date;
  findBy?: string;
}

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
  status!: 'Pendiente' | 'Cancelado' | 'Ausentado' | 'Realizado';
}

export function FilterAppoinments() {
  const [appoinmentData, setAppoinmentData] = useState<Appoinment[]>([]);

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      sex: '',
      race: '',
      size: '',
      neighborhood: '',
      startDate: '',
      endDate: '',
      owner: '',
      status: '',
    },
  });

  const neighborhoodInputData: string[] = [
    'Córdoba',
    'La Perla',
    'Liniers',
    'Parque San Juan',
    'Parque Virrey Este',
    'Portales del Sol',
    'Residencial El Crucero',
    'Sabattini',
    'Sur',
    'Tiro Federal y Piedra del Sapo',
    'Touring',
    'Villa Camiares',
    'General Bustos',
    'Nuevo Amanecer',
    'Villa Oviedo',
    'Parque Virrey Oeste',
    'Lalahenes',
    'San Martín/25 de Mayo',
    'Santa Teresa/Jesús',
    'El Cañito',
    'Pellegrini',
    'Norte',
    'San Juan',
    'Don Bosco',
    'Liniers',
  ];

  const filterAppoinments = (params: FilterParams = {}) => {
    try {
    } catch (err) {
      throw err;
    }
  };

  const neighborhoodOptions = () => {
    return neighborhoodInputData.map((value, key) => (
      <option value={value} key={key}>
        {value}
      </option>
    ));
  };

  const handleOnFilter = () => {};

  const handleOnReset = () => {
    form.reset();
  };
  return (
    <div>
      <DatesProvider
        settings={{
          locale: 'es',
          firstDayOfWeek: 0,
          weekendDays: [0, 6],
          timezone: 'America/Argentina/Buenos_Aires',
        }}
      >
        <Box>
          <Flex direction="column" gap="md">
            <Text size="30px" c="#66355d" fw={700}>
              Turnos
            </Text>
            <Box bd="1px #aaa solid" p="sm">
              <form action="">
                <Grid gutter="10px" columns={20}>
                  <Grid.Col span={5}>
                    <DatePickerInput
                      key={form.key('startDate')}
                      {...form.getInputProps('startDate')}
                      label="Fecha:"
                      placeholder="Desde"
                    />
                  </Grid.Col>
                  <Grid.Col span={5}>
                    <DatePickerInput
                      label=" "
                      placeholder="Hasta"
                      key={form.key('endDate')}
                      {...form.getInputProps('endDate')}
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <NativeSelect
                      key={form.key('size')}
                      {...form.getInputProps('size')}
                      label="Buscar por: "
                    >
                      <option value="DNI">DNI</option>
                      <option value="Nombre y Apellido">
                        Nombre y Apellido
                      </option>
                    </NativeSelect>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <TextInput
                      key={form.key('findBy')}
                      {...form.getInputProps('findBy')}
                      placeholder="Buscar"
                      label="Ingresar: "
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <NativeSelect
                      label="Sexo"
                      key={form.key('sex')}
                      {...form.getInputProps('sex')}
                    >
                      <option value="" style={{ color: '#aaa' }}>
                        Ninguno
                      </option>
                      <option value="Macho">Macho</option>
                      <option value="Hembra">Hembra</option>
                    </NativeSelect>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <NativeSelect
                      label="Raza"
                      key={form.key('race')}
                      {...form.getInputProps('race')}
                    >
                      <option value="" style={{ color: '#aaa' }}>
                        Ninguno
                      </option>
                      <option value="Canino">Canino</option>
                      <option value="Felino">Felino</option>
                    </NativeSelect>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <NativeSelect
                      label="Tamaño"
                      key={form.key('size')}
                      {...form.getInputProps('size')}
                    >
                      <option value="" style={{ color: '#aaa' }}>
                        Ninguno
                      </option>
                      <option value="Grande">Grande</option>
                      <option value="Mediano">Mediano</option>
                      <option value="Pequeño">Pequeño</option>
                    </NativeSelect>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <NativeSelect
                      label="Barrio"
                      key={form.key('neighborhood')}
                      {...form.getInputProps('neighborhood')}
                    >
                      <option value="" style={{ color: '#aaa' }}>
                        Ninguno
                      </option>
                      {neighborhoodOptions()}
                    </NativeSelect>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <NativeSelect
                      label="Estado"
                      key={form.key('status')}
                      {...form.getInputProps('status')}
                    >
                      <option value="" style={{ color: '#aaa' }}>
                        Ninguno
                      </option>
                      <option value="Pendiente">Pendiente</option>
                      <option value="Realizado">Realizado</option>
                      <option value="Cancelado">Cancelado</option>
                      <option value="Ausentado">Ausentado</option>
                    </NativeSelect>
                  </Grid.Col>
                  <Grid.Col span={10}></Grid.Col>
                  <Grid.Col span={5}>
                    <Button fullWidth color="#66355d">
                      Filtrar
                    </Button>
                  </Grid.Col>
                  <Grid.Col span={5}>
                    <Button
                      onClick={handleOnReset}
                      fullWidth
                      variant="outline"
                      color="#66355d"
                    >
                      Reinciar
                    </Button>
                  </Grid.Col>
                </Grid>
              </form>
            </Box>

            <Box>
              <Table></Table>
            </Box>
          </Flex>
        </Box>
      </DatesProvider>
    </div>
  );
}

export default FilterAppoinments;
