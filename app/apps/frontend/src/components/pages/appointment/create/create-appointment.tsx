// Importaciones de componentes de Mantine UI
import {
  Box,
  Button,
  Flex,
  Grid,
  LoadingOverlay,
  Stack,
} from '@mantine/core';
import 'dayjs/locale/es';
// Importaciones de componentes personalizados
import Title from '../../../utilities/title/title';
import { useContext, useEffect, useState} from 'react';
import { MainColorContext } from '../../../../contexts/color-context';
import { DatesProvider, DateValue } from '@mantine/dates';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import useCreateForm from '../../../../hooks/appointment/create/use-create-form/use-create-form';
import { FormColumn } from '../../../utilities/form-column/form-column';
import HourSelect from '../utilities/hour-select/hour-select';
import useSelectsData, { AppoinmentSelects } from '../../../../hooks/appointment/use-selects-data/use-selects-data';
import useAppointment from '../../../../hooks/appointment/use-appointment/use-appointment';

// Definición de la estructura del formulario
class FormValues {
  lastName!: string;  // Apellido del dueño
  name!: string;      // Nombre del dueño
  dni!: string;       // DNI del dueño
  phone!: string;     // Teléfono de contacto
  home!: string;      // Dirección del domicilio
  neighborhood!: string; // Barrio
  size!: string;      // Tamaño de la mascota
  sex!: string;       // Sexo de la mascota
  specie!: string;    // Especie de la mascota
  date!: Date;        // Fecha del turno
  observations!: string; // Observaciones adicionales
  hour!: string;      // Hora del turno
}

// Componente principal para la creación de turnos
export function CreateAppointment() {
  // Inicialización de hooks y estados
  const { form } = useCreateForm();  // Formulario personalizado
  const mainColor = useContext(MainColorContext);  // Color principal de la app
  const navigate = useNavigate();  // Navegación entre rutas
  const [visible, { open: openLoading, close: closeLoading }] = useDisclosure(false);  
  const {getSelectData} = useSelectsData();  // Control del overlay de carga
  const [selectsData, setSelectsData] = useState<AppoinmentSelects>({
    sex: [{value: "", text: ""}],
    specie: [{value: "", text: ""}],
    size: [{value: "", text: ""}],
    neighborhood: [{value: "", text: ""}],
    hour: [{value: "", text: ""}],
    findBy: [{value: "", text: ""}],
    status: [{value: "", text: ""}],
    orderBy: [{value: "", text: ""}],
    reason: [{value: "", text: ""}],
    filterStatus: [{value: "", text: ""}],
    dateFilterWay: [{value: "", text: ""}],
    restrictedNeighborhood: [{value: "", text: ""}],
     restrictedSex: [{value: "", text: ""}],
     restrictedSize: [{value: "", text: ""}],
     restrictedSpecie: [{value: "", text: ""}]
  });  // Datos para los selectores
  const {create} = useAppointment();  // Hook para crear turnos
  const [actualDate, setActualDate] = useState<DateValue>(new Date());
  console.log()  // Fecha actual
  // Función para cancelar y volver al listado
  const handleOnCancel = () => {
    navigate('/turnos/listar');
  };

  // Manejador del envío del formulario
  const handleOnSubmit = async (values: FormValues) => {
    try {
      openLoading();
      await create(values);
      closeLoading();
      navigate('/turnos/listar');
    } catch (err) {
      notifications.show({
        title: 'Ha ocurrido un error',
        message: 'Ha ocurrido un error mientras se agendaba el turno, reintentelo de nuevo mas tarde.',
        color: 'red',
      });
      closeLoading();
      throw err;
    }
  };

  // Inicialización de valores del formulario
  useEffect(() => {
    form.setValues({ hour: '', date: undefined });
    const fetchData =async () => {
      try {
        const data = await getSelectData();
        setSelectsData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  
  // Renderizado del componente
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
          {/* Encabezado del formulario */}
          <Flex direction="row" gap="md" justify="flex-start" align="baseline">
            <Title c={mainColor} text="Nuevo Turno" />
          </Flex>
          {/* Contenedor del formulario */}
          <Box bd="1px #aaa solid" p="sm">
            <form onSubmit={form.onSubmit(handleOnSubmit)}>
              <Grid>
                {/* Campos para datos personales */}
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
                {/* Campos para fecha y hora */}
                <FormColumn
                  inputType="date"
                  form={form}
                  name="date"
                  span={4}
                  label="Fecha: "
                  placeholder="Ingrese Fecha"
                  minDate={new Date()}
                  onChangeDateFunc={(date: DateValue) => {
                    setActualDate(date)
                    form.setValues({date: date})
                  }}
                />
                <Grid.Col span={4}>{<HourSelect form={form} dateValue={actualDate}/>}</Grid.Col>
                
                <FormColumn
                  inputType="select"
                  form={form}
                  name="sex"
                  span={3}
                  label="Sexo: "
                  data={selectsData.restrictedSex}
                />
                <FormColumn
                  inputType="select"
                  form={form}
                  name="specie"
                  span={3}
                  label="Especie: "
                  data={selectsData.restrictedSpecie}
                />
                <FormColumn
                  inputType="select"
                  form={form}
                  name="size"
                  span={3}
                  label="Tamaño: "
                  data={selectsData.restrictedSize}
                />
                <FormColumn
                  inputType="select"
                  form={form}
                  name="neighborhood"
                  span={3}
                  label="Barrio: "
                  data={selectsData.restrictedNeighborhood}
                />
                {/* Campo de observaciones */}
                <FormColumn
                  inputType="textarea"
                  label="Observaciones"
                  placeholder="Escriba aquí si tiene observaciones"
                  name="observations"
                  form={form}
                  span={12}
                  notRequired
                />
                {/* Botones de acción */}
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

export default CreateAppointment;
