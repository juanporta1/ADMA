// Importaciones de componentes de Mantine UI
import {
  Box,
  Button,
  Flex,
  Grid,
  LoadingOverlay,
  Stack,
} from '@mantine/core';
import styles from './edit-appoinment.module.css';
import 'dayjs/locale/es';

// Importaciones de componentes personalizados

import { useContext, useEffect, useState } from 'react';
import { MainColorContext } from '../../../../contexts/color-context';
import { DatesProvider, DateValue } from '@mantine/dates';
import { FormColumn } from '../../../utilities/form-column/form-column';
import HourSelect from '../utilities/hour-select/hour-select';
import useGetEditSelectsData from '../../../../hooks/appoinment/edit/get-edit-selects-data/get-edit-selects-data';
import useEditForm from '../../../../hooks/appoinment/edit/use-edit-form/use-edit-form';
import { useDisclosure } from '@mantine/hooks';
import { Appoinment } from '../filter/filter-appoinments';

// Definición de la estructura del formulario
interface FormValues {
  owner: string;    // Nombre del dueño
  dni: string;       // DNI del dueño
  phone: string;     // Teléfono de contacto
  home: string;      // Dirección del domicilio
  neighborhood: string; // Barrio
  size: string;      // Tamaño de la mascota
  sex: string;       // Sexo de la mascota
  specie: string;    // Especie de la mascota
  date: Date;        // Fecha del turno
  observations: string; // Observaciones adicionales
  hour: string;
  status?: string;      // Hora del turno
}

interface props{
  appoinment: Appoinment;
  cancelFunc: () => void;
}
// Componente principal para la edición de turnos (estructura igual a creación)
export function EditAppoinment({appoinment,cancelFunc}: props) {
  // Inicialización de hooks y estados
  const { form } = useEditForm();  // Formulario personalizado
  const mainColor = useContext(MainColorContext);  // Color principal de la app
  
  const [actualDate, setActualDate] = useState<DateValue>(new Date());
  const selectsData = useGetEditSelectsData();  // Datos para los selectores
  const [visible, {open, close}] = useDisclosure(false);
  // Función para cancelar y volver al listado
  const handleOnCancel = () => {
    cancelFunc();
  };

  // Manejador del envío del formulario
  const handleOnSubmit = async (values: FormValues) => {
    
  };

  // Inicialización de valores del formulario
  useEffect(() => {
    const twoNames = appoinment.owner.split(',');
    const dateWithoutTimezone = new Date(appoinment.date + 'T00:00:00');
    
    const settings: typeof form.values = {
      lastName: twoNames[0],
      name: twoNames[1],
      dni: appoinment.dni,
      phone: appoinment.phone,
      home: appoinment.home,
      neighborhood: appoinment.neighborhood,
      size: appoinment.size,
      sex: appoinment.sex,
      specie: appoinment.specie,
      date: dateWithoutTimezone,
      hour: appoinment.hour,
      observations: appoinment.observations || '',
    }

    form.setValues(settings);
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
                  onChangeFunc={(date) => {
                    setActualDate(date);
                    form.setValues({ date: date });
                  }}
                />
                <Grid.Col span={4}>{<HourSelect form={form} dateValue={actualDate} registerId={appoinment.ID_appoinment}/>}</Grid.Col>
                {/* Campos para datos de la mascota */}
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
