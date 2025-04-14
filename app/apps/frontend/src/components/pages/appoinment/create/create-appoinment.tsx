import {
  Box,
  Button,
  Flex,
  Grid,
  LoadingOverlay,
  NativeSelect,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import styles from './create-appoinment.module.css';
import 'dayjs/locale/es';
import { useForm } from '@mantine/form';
import Title from '../../../utilities/title/title';
import { useContext, useEffect, useState } from 'react';
import { MainColorContext } from '../../../../contexts/color-context';
import { DatePickerInput, DatesProvider } from '@mantine/dates';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';

class FormValues {
  lastName!: string;
  name!: string;
  dni!: string;
  phone!: string;
  home!: string;
  neighborhood!: string;
  size!: string;
  sex!: string;
  race!: string;
  date!: Date;
  observations!: string;
  hour!: string;
}

class NewAppoinment {
  owner!: string;
  home!: string;
  neighborhood!: string;
  phone!: string;
  dni!: string;
  date!: Date;
  size!: string;
  sex!: string;
  race!: string;
  observations!: string | null;
}

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
      home: '',
      date: new Date(),
      observations: '',
      hour: '',
    },
    validate: {
      lastName: (value: string) => {
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(value))
          return 'El apellido unicamente debe contener letras.';
        else return null;
      },
      name: (value: string) => {
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(value))
          return 'El nombre unicamente debe contener letras.';
        else return null;
      },
      dni: (value: string) => {
        if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(value))
          return 'El DNI unicamente debe contener numeros.';
        else return null;
      },
      phone: (value: string) => {
        if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(value))
          return 'El DNI unicamente debe contener numeros.';
        else return null;
      },
      observations: (value) => {
        if (value.length > 800)
          return 'El DNI unicamente debe contener numeros.';
        else return null;
      },
    },
  });
  const mainColor = useContext(MainColorContext);
  const navigate = useNavigate();
  const [visible, {open: openLoading, close: closeLoading}] = useDisclosure(false);
  const [actualDate, setActualDate] = useState<Date | null>(null);
  const [disabledSelects, setDisabledSelects] = useState<boolean[]>([]);
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

  const handleOnSubmit = (values: FormValues) => {
    try {
      openLoading()
      const newDate = new Date(
        `${values.date.getFullYear()}-${
          values.date.getMonth() + 1
        }-${values.date.getDate()} ${values.hour}:00:00.000`
      );
      const newOwner = `${values.lastName}, ${values.name}`;

      const newAppoinment: NewAppoinment = {
        owner: newOwner,
        home: values.home,
        neighborhood: values.neighborhood,
        dni: values.dni,
        phone: values.phone,
        race: values.race,
        size: values.size,
        sex: values.sex,
        date: newDate,
        observations: values.observations,
      };
      axios
        .post('http://localhost:3000/api/appoinment', newAppoinment)
        .then((res) => {
          console.log(res.data);
        });
      notifications.show({
        title: 'Carga del nuevo tunro exitosa',
        message:
          'El turno ha sido agendado.',
        color: 'green',
      })
      closeLoading()
      navigate("/turnos/listar")
    } catch (err) {
      notifications.show({
        title: 'Ha ocurrido un error',
        message:
          'Ha ocurrido un error mientras se agendaba el turno, reintentelo de nuevo mas tarde.',
        color: 'red',
      })
      closeLoading()
      
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

  const HourNativeSelect = () => {
    if (actualDate) {
      return (
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
          <option value="8" disabled={disabledSelects[0]}>
            8:00
          </option>
          <option value="10" disabled={disabledSelects[1]}>
            10:00
          </option>
          <option value="12" disabled={disabledSelects[2]}>
            12:00
          </option>
        </NativeSelect>
      );
    } else {
      return (
        <NativeSelect label="Hora: " defaultValue="">
          <option value="">Primero debe seleccionar una fecha</option>
        </NativeSelect>
      );
    }
  };

  useEffect(() => {
    form.setValues({ hour: '', date: undefined });
  }, []);
  useEffect(() => {
    if (!actualDate) return;

    const fetchDisabledHours = async () => {
      const hours = [8, 10, 12];
      const results: boolean[] = [];

      for (let hour of hours) {
        try {
          const date = `${actualDate.getFullYear()}-${
            actualDate.getMonth() + 1
          }-${actualDate.getDate()}`;
          const res = await axios.get('http://localhost:3000/api/appoinment', {
            params: { byHour: `${date} ${hour}:00:00.000` },
          });
          console.log(actualDate);
          console.log(res.data);
          console.log(hour);
          results.push(res.data.length > 10);
        } catch (err) {
          console.error(err);
          results.push(true);
        }
      }

      setDisabledSelects(results);
      if (results.includes(true) && !results.includes(false))
        notifications.show({
          title: 'Sin horarios disponibles',
          message:
            'La fecha seleccionada tiene todos los horarios en su maxima capacidad.',
          color: 'red',
        });
      else if (results.includes(true))
        notifications.show({
          title: 'Algunos horarios no estan disponibles',
          message:
            'En la fecha seleccionada, algunos horarios estan en su maxima capacidad.',
          color: 'yellow',
        });
    };

    fetchDisabledHours();
  }, [actualDate]);
  return (
    <div>
      <LoadingOverlay visible={visible}/>
      <DatesProvider
        settings={{
          locale: 'es',
          firstDayOfWeek: 0,
          weekendDays: [0, 6],
          timezone: 'America/Argentina/Buenos_Aires',
        }}
      >
        <Stack>
          <Flex direction="row" gap="md" justify="flex-start" align="baseline">
            <Title c={mainColor} text="Nuevo Turno" />
          </Flex>
          <Box bd="1px #aaa solid" p="sm">
            <form onSubmit={form.onSubmit(handleOnSubmit)}>
              <Grid>
                <Grid.Col span={3}>
                  <TextInput
                    label="Apellido: "
                    placeholder="Ingresar Apellido"
                    key={form.key('lastName')}
                    {...form.getInputProps('lastName')}
                    required
                  />
                </Grid.Col>
                <Grid.Col span={3}>
                  <TextInput
                    label="Nombre: "
                    placeholder="Ingresar Nombre"
                    key={form.key('name')}
                    {...form.getInputProps('name')}
                    required
                  />
                </Grid.Col>
                <Grid.Col span={3}>
                  <TextInput
                    label="DNI: "
                    placeholder="Ingresar DNI"
                    key={form.key('dni')}
                    {...form.getInputProps('dni')}
                    required
                  />
                </Grid.Col>
                <Grid.Col span={3}>
                  <TextInput
                    label="Domicilio: "
                    placeholder="Ingresar Domicilio"
                    key={form.key('home')}
                    {...form.getInputProps('home')}
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
                    onChange={(date) => {
                      if (date) {
                        setActualDate(date);
                        form.setValues({ date: date });
                      }
                    }}
                    required
                  />
                </Grid.Col>
                <Grid.Col span={4}>{<HourNativeSelect />}</Grid.Col>
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
                    key={form.key("observations")}
                    {...form.getInputProps("observations")}
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <Button fullWidth color={mainColor} type="submit">
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
