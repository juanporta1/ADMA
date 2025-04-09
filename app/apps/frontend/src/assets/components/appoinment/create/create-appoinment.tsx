import {
  Box,
  Button,
  Flex,
  Grid,
  NativeSelect,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import styles from './create-appoinment.module.css';
import 'dayjs/locale/es';
import { useForm } from '@mantine/form';
import Title from '../../utilities/title/title';
import { useContext } from 'react';
import { MainColorContext } from '../../../contexts/color-context';
import { DatePickerInput, DatesProvider } from '@mantine/dates';
import { useNavigate } from 'react-router-dom';

export function CreateAppoinment() {
  const form = useForm({
    mode: 'controlled',
    initialValues: {
      lastName: '',
      name: '',
      dni: '',
      phone: '',
      neighborhood: '',
      size: '',
      race: '',
      sex: '',
      date: null,
      observations: '',
      hour: '',
    },
    validate: {
      lastName: (value: string) => {
        if(!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(value)) return "El apellido unicamente debe contener letras."
        else return null
      },
      name: (value: string) => {
        if(!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(value)) return "El nombre unicamente debe contener letras."
        else return null
      },
      dni: (value: string) => {
        if(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(value)) return "El DNI unicamente debe contener numeros."
        else return null
      },
      phone: (value: string) => {
        if(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(value)) return "El DNI unicamente debe contener numeros."
        else return null
      }
    },
  });
  const mainColor = useContext(MainColorContext);
  const navigate = useNavigate();
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
  const handleOnCancel = () => {
    navigate('/turnos/filtrar');
  };

  const handleOnSubmit = () => {};

  const neighborhoodOptions = () => {
    return neighborhoodInputData.map((value, key) => (
      <option value={value} key={key}>
        {value}
      </option>
    ));
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
        <Stack>
          <Flex direction="row" justify="flex-start" align="center">
            <Title c={mainColor} text="Cargar Turno" />
          </Flex>
          <Box bd="1px #aaa solid" p="sm">
            <form onSubmit={form.onSubmit(handleOnSubmit)}>

            
            <Grid>
              <Grid.Col span={4}>
                <TextInput
                  label="Apellido: "
                  placeholder="Ingresar Apellido"
                  key={form.key('lastName')}
                  {...form.getInputProps('lastName')}
                  required
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <TextInput
                  label="Nombre: "
                  placeholder="Ingresar Nombre"
                  key={form.key('name')}
                  {...form.getInputProps('name')}
                  required
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <TextInput
                  label="DNI: "
                  placeholder="Ingresar DNI"
                  key={form.key('dni')}
                  {...form.getInputProps('dni')}
                  required
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <TextInput
                  label="Teléfono: "
                  placeholder="Ingresar Teléfono"
                  key={form.key('phone')}
                  {...form.getInputProps('phone')}
                  required
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <DatePickerInput
                  label="Fecha: "
                  placeholder="Ingrese Fecha"
                  minDate={new Date()}
                  key={form.key('date')}
                  {...form.getInputProps('date')}
                  required
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <NativeSelect
                  label="Hora: "
                  defaultValue=""
                  key={form.key('hour')}
                  {...form.getInputProps('hour')}
                  required
                >
                  <option value="" disabled>
                    Seleccione Horario
                  </option>
                  <option value="eight">8:00</option>
                  <option value="ten">10:00</option>
                  <option value="twelve">12:00</option>
                </NativeSelect>
              </Grid.Col>
              <Grid.Col span={3}>
                <NativeSelect
                  label="Sexo: "
                  key={form.key('sex')}
                  {...form.getInputProps('sex')}
                  required
                >
                  <option value="" disabled>
                    Seleccione Sexo
                  </option>
                  <option value="Macho">Macho</option>
                  <option value="Hembra">Hembra</option>
                </NativeSelect>
              </Grid.Col>
              <Grid.Col span={3}>
                <NativeSelect
                  label="Raza: "
                  key={form.key('race')}
                  {...form.getInputProps('race')}
                  required
                >
                  <option value="" disabled>
                    Seleccione Raza
                  </option>
                  <option value="Canino">Canino</option>
                  <option value="Felino">Felino</option>
                </NativeSelect>
              </Grid.Col>
              <Grid.Col span={3}>
                <NativeSelect
                  label="Tamaño: "
                  key={form.key('size')}
                  {...form.getInputProps('size')}
                  required
                >
                  <option value="" disabled>
                    Seleccione Tamaño
                  </option>
                  <option value="Grande">Grande</option>
                  <option value="Mediano">Mediano</option>
                  <option value="Pequeño">Pequeño</option>
                </NativeSelect>
              </Grid.Col>
              <Grid.Col span={3}>
                <NativeSelect
                  label="Barrio: "
                  key={form.key('neighborhood')}
                  required
                  {...form.getInputProps('neighborhood')}
                >
                  <option value="" disabled>
                    Seleccione Barrio
                  </option>
                  {neighborhoodOptions()}
                </NativeSelect>
              </Grid.Col>
              <Grid.Col span={12}>
                <Textarea
                  label="Observaciones: "
                  placeholder="Escriba aqui si tiene observaciones"
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Button fullWidth color={mainColor} type='submit' onClick={handleOnSubmit}>
                  Cargar Turno
                </Button>
              </Grid.Col>
              <Grid.Col span={12}>
                <Button
                  fullWidth
                  variant="outline"
                  color={mainColor}
                  onClick={handleOnCancel}
                >
                  Cancelar
                </Button>
              </Grid.Col>
            </Grid>
            </form>
          </Box>
        </Stack>
      </DatesProvider>
    </div>
  );
}

export default CreateAppoinment;
