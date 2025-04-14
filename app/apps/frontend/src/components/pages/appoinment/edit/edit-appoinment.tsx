import { useContext, useEffect, useState } from 'react';
import styles from './edit-appoinment.module.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Fieldset,
  Flex,
  Grid,
  LoadingOverlay,
  Modal,
  NativeSelect,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { DatePickerInput, DatesProvider } from '@mantine/dates';
import Title from '../../../utilities/title/title';
import { useForm, UseFormReturnType } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { MainColorContext } from '../../../../contexts/color-context';
import App from '../../../../app/app';
import { stat } from 'fs';
import { notifications } from '@mantine/notifications';

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
  reason!:
    | 'Embarazada'
    | 'En celo'
    | 'Se ausento'
    | 'Muerte del animal'
    | 'Otras razones';
  observations!: string;
}

class FormValues {
  lastName!: string;
  name!: string;
  dni!: string;
  phone!: string;
  neighborhood!: string;
  size!: string;
  race!: string;
  sex!: string;
  home!: string;
  date!: Date;
  observations!: string;
  hour!: string;
  status!: string;
  reason!: string;
}
export function EditAppoinment() {
  const { id } = useParams();

  const [actualAppoinment, setAppoinment] = useState<Appoinment>(
    new Appoinment()
  );
  const [form, setForm] = useState<UseFormReturnType<any>>(
    useForm({
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
        status: '',
        reason: '',
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
        observations: (value: string) => {
          if (value.length > 800)
            return 'Las observaciones no pueden ser tan largas';
          else return null;
        },
      },
      validateInputOnChange: true,
      validateInputOnBlur: true,
    })
  );

  const navigate = useNavigate();
  // const [visible, { open: openLoading, close: closeLoading }] =
  //   useDisclosure(false);

  const mainColor = useContext(MainColorContext);
  const [disabledSelects, setDisabledSelects] = useState<boolean[]>([]);
  const [actualDate, setActualDate] = useState<Date | null>(null);
  const [editModal, {open: openEditModal, close: closeEditModal}] = useDisclosure(false)
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
    navigate('/turnos/listar');
  };
  const handleOnSubmit = () => {
    openEditModal()
  }

  const submit = (params: typeof form.values) => {
    try {
      const date = new Date(
        `${params.date.getFullYear()}-${
          params.date.getMonth() + 1
        }-${params.date.getDate()} ${params.hour}`
      );
      const reason: string | null =
        params.reason == '' ? null : params.reason;

      const data = {
        owner: `${params.lastName},${params.name}`,
        home: params.home,
        phone: params.phone,
        neighborhood: params.neighborhood,
        dni: params.dni,
        date,
        size: params.size,
        sex: params.sex,
        race: params.race,
        status: params.status,
        observations: params.observations,
        reason,
      };
      axios
        .put(
          `http://localhost:3000/api/appoinment/${actualAppoinment.ID_appoinment}`,
          data
        )
        .then((res) => {
          console.log(res.data);
          navigate("/turnos/listar")
          closeEditModal()
          
          const isTheSame = Object.keys(data).every((key,value) => value === actualAppoinment[key as keyof Appoinment])
          if (!isTheSame){
            notifications.show({
              title:"Edicion exitosa",
              message: "El registro ha sido editado con exito.",
              color: "green"
            })
          }
          
        });
    } catch (err) {
      notifications.show({
        title:"Edicion exitosa",
        message: "El registro ha sido editado con exito.",
        color: "green"
      })
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
    if (actualDate || new Date(actualAppoinment.date)) {
      return (
        <NativeSelect
          label="Hora: "
          defaultValue=""
          key={form.key('hour')}
          {...form.getInputProps('hour')}
          disabled={actualAppoinment.status !== 'Pendiente' ? true : false}
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
    try {
      axios
        .get(`http://localhost:3000/api/appoinment`, {
          params: {
            id,
          },
        })
        .then((res) => {
          setAppoinment(res.data[0]);
          const appoinment = res.data[0];
          console.log(res.data);
          const [lastName, name] = appoinment.owner.split(',');
          0;
          appoinment.date = new Date(appoinment.date);

          const date = `${appoinment.date.getFullYear()}-${
            appoinment.date.getMonth() + 1
          }-${appoinment.date.getDate()}`;

          const hours = `${appoinment.date.getHours()}:00:00`;
          const observations = appoinment.observations
            ? appoinment.observations
            : '';
          const reason = appoinment.reason ? appoinment.reason : '';
          form.setValues({
            lastName: lastName,
            name: name,
            dni: appoinment?.dni,
            phone: appoinment?.phone,
            neighborhood: appoinment?.neighborhood,
            size: appoinment?.size,
            race: appoinment?.race,
            sex: appoinment?.sex,
            home: appoinment?.home,
            date: new Date(date),
            observations,
            hour: hours,
            status: appoinment.status,
            reason,
          });
        });
    } catch (err) {
      throw err;
    }
  }, []);

  useEffect(() => {
    console.log(actualAppoinment);
  }, [actualAppoinment]);

  return (
    <div>
      {/* <LoadingOverlay visible={visible} /> */}
      <Modal centered title="¿Seguro quieres editar este turno?" opened={editModal} onClose={closeEditModal}>
        <Flex direction={"row"} justify={"center"} align={"center"} gap={"xl"}>
          <Button color={mainColor} variant='light' onClick={() => {
            submit(form.getValues())
          }}>
            Si, estoy seguro
          </Button>
          <Button color={mainColor}>
            Cancelar
          </Button>
        </Flex>
      </Modal>
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
            <Title c={mainColor} text="Editar Turno" />
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
                    disabled={
                      actualAppoinment.status !== 'Pendiente' ? true : false
                    }
                    required
                  />
                </Grid.Col>
                <Grid.Col span={3}>
                  <TextInput
                    label="Nombre: "
                    placeholder="Ingresar Nombre"
                    key={form.key('name')}
                    {...form.getInputProps('name')}
                    disabled={
                      actualAppoinment.status !== 'Pendiente' ? true : false
                    }
                    required
                  />
                </Grid.Col>
                <Grid.Col span={3}>
                  <TextInput
                    label="DNI: "
                    placeholder="Ingresar DNI"
                    key={form.key('dni')}
                    {...form.getInputProps('dni')}
                    disabled={
                      actualAppoinment.status !== 'Pendiente' ? true : false
                    }
                    required
                  />
                </Grid.Col>
                <Grid.Col span={3}>
                  <TextInput
                    label="Domicilio: "
                    placeholder="Ingresar Domicilio"
                    key={form.key('home')}
                    {...form.getInputProps('home')}
                    disabled={
                      actualAppoinment.status !== 'Pendiente' ? true : false
                    }
                    required
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <TextInput
                    label="Teléfono: "
                    placeholder="Ingresar Teléfono"
                    key={form.key('phone')}
                    {...form.getInputProps('phone')}
                    disabled={
                      actualAppoinment.status !== 'Pendiente' ? true : false
                    }
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
                    disabled={
                      actualAppoinment.status !== 'Pendiente' ? true : false
                    }
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
                    disabled={
                      actualAppoinment.status !== 'Pendiente' ? true : false
                    }
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
                    disabled={
                      actualAppoinment.status !== 'Pendiente' ? true : false
                    }
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
                    disabled={
                      actualAppoinment.status !== 'Pendiente' ? true : false
                    }
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
                    disabled={
                      actualAppoinment.status !== 'Pendiente' ? true : false
                    }
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
                    key={form.key('observations')}
                    {...form.getInputProps('observations')}
                  />
                </Grid.Col>
                <Grid.Col span={3}>
                  <NativeSelect
                    label="Estado: "
                    key={form.key('status')}
                    {...form.getInputProps('status')}
                    required
                  >
                    {actualAppoinment.status === 'Esperando Actualización' ? (
                      <option value="Esperando Actualización" disabled>
                        Esperando Actualización
                      </option>
                    ) : (
                      <></>
                    )}
                    {actualAppoinment.status !== 'Esperando Actualización' ? (
                      <option value="Pendiente">Pendiente</option>
                    ) : (
                      <></>
                    )}
                    {actualAppoinment.status === 'Esperando Actualización' ? (
                      <option value="Realizado">Realizado</option>
                    ) : (
                      <></>
                    )}

                    <option value="Cancelado">Cancelado</option>
                    <option value="Ausentado">Ausentado</option>
                  </NativeSelect>
                </Grid.Col>
                {form.getValues().status === 'Cancelado' ? (
                  <Grid.Col span={3}>
                    <NativeSelect
                      label="Razón: "
                      key={form.key('reason')}
                      {...form.getInputProps('reason')}
                      required
                    >
                      <option value="Embarazada">Animal en Cinta</option>
                      <option value="En celo">En Celo</option>
                      <option value="Se ausento">Ausencia Justificada</option>
                      <option value="Muerte del animal">
                        Muerte del Animal
                      </option>
                      <option value="Otras razones">Otras razones</option>
                    </NativeSelect>
                  </Grid.Col>
                ) : (
                  <></>
                )}
                <Grid.Col span={12}>
                  <Button fullWidth color={mainColor} type="submit">
                    Editar Turno
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

export default EditAppoinment;
