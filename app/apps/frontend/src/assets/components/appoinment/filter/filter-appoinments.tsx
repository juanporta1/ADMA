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
import { useEffect, useState } from 'react';
class FilterParams {
  sex?: string;
  race?: string;
  size?: string;
  neighborhood?: string;
  startDate?: Date;
  endDate?: Date;
  input?: string;
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
  const [findBy, setFindBy] = useState<string>('owner');
  const form = useForm({
    mode: 'controlled',
    initialValues: {
      sex: '',
      race: '',
      size: '',
      neighborhood: '',
      startDate: new Date(),
      endDate: null,
      input: '',
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
      if (params.input) {
        const { input, ...otherParams } = params;
        const newObject = {
          [findBy]: input,
          ...otherParams,
        };
        axios
          .get('http://localhost:3000/api/appoinment', {
            params: newObject,
          })
          .then((res) => {
            setAppoinmentData(res.data);
            console.log(res.data);
          });
      } else {
        axios
          .get('http://localhost:3000/api/appoinment', {
            params,
          })
          .then((res) => {
            setAppoinmentData(res.data);
            console.log(res.data);
          });
      }
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

  const handleOnReset = () => {
    form.reset();
  };

  const Rows = () => {
    return appoinmentData.map((appoinment) => {
      const convertedDate = new Date(appoinment.date);
      const formattedDate = new Intl.DateTimeFormat('es-AR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(convertedDate);

      const formattedTime = new Intl.DateTimeFormat('es-AR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(convertedDate);
      const canEdit = new Date(appoinment.date) < new Date() ? true : false;
      return (
        <Table.Tr>
          <Table.Td>{formattedDate}</Table.Td>
          <Table.Td>{formattedTime}</Table.Td>
          <Table.Td>{appoinment.owner}</Table.Td>
          <Table.Td>{appoinment.dni}</Table.Td>
          <Table.Td>{appoinment.home}</Table.Td>
          <Table.Td>{appoinment.phone}</Table.Td>
          <Table.Td>{appoinment.neighborhood}</Table.Td>
          <Table.Td>{appoinment.race}</Table.Td>
          <Table.Td>{appoinment.sex}</Table.Td>
          <Table.Td>{appoinment.size}</Table.Td>
          <Table.Td>{appoinment.status}</Table.Td>
          <Table.Td>
            <Button color="#66355d" disabled={canEdit}>
              Editar
            </Button>
          </Table.Td>
        </Table.Tr>
      );
    });
  };

  useEffect(() => {
    const params = Object.fromEntries(
      Object.entries(form.values).filter(
        ([key, value]) => value != null && value != ''
      )
    );
    filterAppoinments(params);
  }, [form.values]);

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
                      onChange={(e) => {
                        setFindBy(e.currentTarget.value);
                        console.log(e.currentTarget.value);
                      }}
                      value={findBy}
                      label="Buscar por: "
                    >
                      <option value="dni">DNI</option>
                      <option value="owner">Nombre y Apellido</option>
                    </NativeSelect>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <TextInput
                      key={form.key('input')}
                      {...form.getInputProps('input')}
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
                        Todos
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
                        Todas
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
                        Todos
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
                        Todos
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
                        Todos
                      </option>
                      <option value="Pendiente">Pendiente</option>
                      <option value="Realizado">Realizado</option>
                      <option value="Cancelado">Cancelado</option>
                      <option value="Ausentado">Ausentado</option>
                    </NativeSelect>
                  </Grid.Col>
                  <Grid.Col span={15}></Grid.Col>
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
              <Table>
                <Table.Thead>
                  <Table.Th>Fecha</Table.Th>
                  <Table.Th>Hora</Table.Th>
                  <Table.Th>Dueño</Table.Th>
                  <Table.Th>DNI</Table.Th>
                  <Table.Th>Domicilio</Table.Th>
                  <Table.Th>Telefono</Table.Th>
                  <Table.Th>Barrio</Table.Th>
                  <Table.Th>Raza</Table.Th>
                  <Table.Th>Sexo</Table.Th>
                  <Table.Th>Tamaño</Table.Th>
                  <Table.Th>Estado</Table.Th>
                </Table.Thead>
                <Table.Tbody>{<Rows></Rows>}</Table.Tbody>
              </Table>
            </Box>
          </Flex>
        </Box>
      </DatesProvider>
    </div>
  );
}

export default FilterAppoinments;
