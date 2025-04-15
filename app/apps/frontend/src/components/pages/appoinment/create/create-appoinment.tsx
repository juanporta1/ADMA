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
import { useCreateForm } from '../../../../hooks/appoinment/create/use-create-form/use-create-form';
import { NeighborhoodsContext } from '../../../../contexts/neighborhoods-context';
import { FormColumn } from '../../../utilities/form-column/form-column';
import { useGetCreateSelectsData } from '../../../../hooks/appoinment/create/get-create-selects-data/get-create-selects-data';

class FormValues {
  lastName!: string;
  name!: string;
  dni!: string;
  phone!: string;
  home!: string;
  neighborhood!: string;
  size!: string;
  sex!: string;
  specie!: string;
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
  hour!: string;
  size!: string;
  sex!: string;
  specie!: string;
  observations!: string | null;
}

export function CreateAppoinment() {
  const { form } = useCreateForm();
  const mainColor = useContext(MainColorContext);
  const navigate = useNavigate();
  const [visible, { open: openLoading, close: closeLoading }] =
    useDisclosure(false);
  const [disabledSelects, setDisabledSelects] = useState<boolean[]>([]);
  const neighborhoodInputData: string[] = Array(
    ...useContext(NeighborhoodsContext)
  );
  const selectsData = useGetCreateSelectsData();


  const handleOnCancel = () => {
    navigate('/turnos/listar');
  };

  const handleOnSubmit = (values: FormValues) => {
    try {
      openLoading();

      const newOwner = `${values.lastName}, ${values.name}`;

      const newAppoinment: NewAppoinment = {
        owner: newOwner,
        home: values.home,
        neighborhood: values.neighborhood,
        dni: values.dni,
        phone: values.phone,
        specie: values.specie,
        size: values.size,
        sex: values.sex,
        date: values.date,
        hour: values.hour,
        observations: values.observations,
      };
      axios
        .post('http://localhost:3000/api/appoinment', newAppoinment)
        .then((res) => {
          console.log(res.data);
        });
      notifications.show({
        title: 'Carga del nuevo tunro exitosa',
        message: 'El turno ha sido agendado.',
        color: 'green',
      });
      closeLoading();
      navigate('/turnos/listar');
    } catch (err) {
      notifications.show({
        title: 'Ha ocurrido un error',
        message:
          'Ha ocurrido un error mientras se agendaba el turno, reintentelo de nuevo mas tarde.',
        color: 'red',
      });
      closeLoading();

      throw err;
    }
  };

  const HourNativeSelect = () => {
    if (form.values.date) {
      return (
        <NativeSelect
          label="Hora: "
          key={form.key('hour')}
          {...form.getInputProps('hour')}
          required
        >
          <option value="" disabled>
            Seleccione Horario
          </option>
          <option value="8:00" disabled={disabledSelects[0]}>
            8:00
          </option>
          <option value="10:00" disabled={disabledSelects[1]}>
            10:00
          </option>
          <option value="12:00" disabled={disabledSelects[2]}>
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
    if (!form.values.date) return;

    const fetchDisabledHours = async () => {
      const hours = [8, 10, 12];
      const results: boolean[] = [];

      for (let hour of hours) {
        try {
          const date = `${form.values.date.getFullYear()}-${
            form.values.date.getMonth() + 1
          }-${form.values.date.getDate()}`;
          const res = await axios.get('http://localhost:3000/api/appoinment', {
            params: { byHour: `${hour}:00`, byDate: `${date}` },
          });

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
  }, [form.values.date]);
  return (
    <div>
      <LoadingOverlay visible={visible} />
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
                <FormColumn
                  inputType="text"
                  form={form}
                  name="lastName"
                  span={3}
                  label="Apellido: "
                  placeholder="Ingresar Apellido"
                />
                <FormColumn
                  inputType="text"
                  form={form}
                  name="name"
                  span={3}
                  label="Nombre: "
                  placeholder="Ingresar Nombre"
                />
                <FormColumn
                  inputType="text"
                  form={form}
                  name="dni"
                  span={3}
                  label="DNI: "
                  placeholder="Ingresar DNI"
                />
                <FormColumn
                  inputType="text"
                  form={form}
                  name="home"
                  span={3}
                  label="Domicilio: "
                  placeholder="Ingresar Domicilio"
                />
                <FormColumn
                  inputType="text"
                  form={form}
                  name="phone"
                  span={4}
                  label="Teléfono: "
                  placeholder="Ingresar Teléfono"
                  notRequired
                />
                <FormColumn
                  inputType="date"
                  form={form}
                  name="date"
                  span={4}
                  label="Fecha: "
                  placeholder="Ingrese Fecha"
                  minDate={new Date()}
                  
                />
                <Grid.Col span={4}>{<HourNativeSelect />}</Grid.Col>
                <FormColumn
                  inputType="select"
                  form={form}
                  name="sex"
                  span={3}
                  label="Sexo: "
                  data={selectsData.sex}
                />
                <FormColumn
                  inputType="select"
                  form={form}
                  name="specie"
                  span={3}
                  label="Especie: "
                  data={selectsData.specie}
                />
                <FormColumn
                  inputType="select"
                  form={form}
                  name="size"
                  span={3}
                  label="Tamaño: "
                  data={selectsData.size}
                />
                <FormColumn
                  inputType="select"
                  form={form}
                  name="neighborhood"
                  span={3}
                  label="Barrio: "
                  data={selectsData.neighborhood}
                />
                <Grid.Col span={12}>
                  <Textarea
                    label="Observaciones: "
                    placeholder="Escriba aqui si tiene observaciones"
                    key={form.key('observations')}
                    {...form.getInputProps('observations')}
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
