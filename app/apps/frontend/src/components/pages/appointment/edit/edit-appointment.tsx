// Importaciones de componentes de Mantine UI
import { Box, Button, Grid, LoadingOverlay, Stack } from '@mantine/core';
import 'dayjs/locale/es';

// Importaciones de componentes personalizados

import { useContext, useEffect, useState } from 'react';
import { MainColorContext } from '../../../../contexts/color-context';
import { DatesProvider, DateValue } from '@mantine/dates';
import { FormColumn } from '../../../utilities/form-column/form-column';
import HourSelect from '../utilities/hour-select/hour-select';
import useEditForm from '../../../../hooks/appointment/edit/use-edit-form/use-edit-form';
import { useDisclosure } from '@mantine/hooks';
import { useAppointment } from '../../../../hooks/appointment/use-appointment/use-appointment';
import useSelectsData from '../../../../hooks/appointment/use-selects-data/use-selects-data';
import { Appointment } from '../../../../types/entities.types';
import { AppoinmentSelects } from '../../../../types/utilities.types';

// Definición de la estructura del formulario
export interface EditFormValues {
  lastName: string; // Nombre del dueño
  name: string; // Nombre del dueño
  dni: string; // DNI del dueño
  phone: string | null; // Teléfono de contacto
  home: string; // Dirección del domicilio
  neighborhood: string; // Barrio
  size: 'Grande' | 'Pequeño'; // Tamaño de la mascota
  sex: 'Macho' | 'Hembra'; // Sexo de la mascota
  specie: 'Canino' | 'Felino'; // Especie de la mascota
  date: Date; // Fecha del turno
  observations: string | null; // Observaciones adicionales
  hour: string;
  status:
  | 'Pendiente'
  | 'Cancelado'
  | 'Ausentado'
  | 'Esperando Actualización'
  | 'En Proceso'
  | 'Realizado'
  | 'No Realizado'; // Hora del turno
  reason: string;
}

interface props {
  appointment: Appointment;
  cancelFunc: () => void;
  onSubmit: () => void;
}
// Componente principal para la edición de turnos (estructura igual a creación)
export function EditAppointment({ appointment, cancelFunc, onSubmit }: props) {
  // Inicialización de hooks y estados
  const { form } = useEditForm(); // Formulario personalizado

  const mainColor = useContext(MainColorContext); // Color principal de la app
  const [actualStatus, setActualStatus] = useState<string>(appointment.status);
  const [actualDate, setActualDate] = useState<DateValue>(new Date());
  const { getSelectData } = useSelectsData();
  const [selectsData, setSelectsData] = useState<AppoinmentSelects>({
    sex: [{ value: '', text: '' }],
    specie: [{ value: '', text: '' }],
    size: [{ value: '', text: '' }],
    neighborhood: [{ value: '', text: '' }],
    hour: [{ value: '', text: '' }],
    findBy: [{ value: '', text: '' }],
    status: [{ value: '', text: '' }],
    orderBy: [{ value: '', text: '' }],
    reason: [{ value: '', text: '' }],
    filterStatus: [{ value: '', text: '' }],
    dateFilterWay: [{ value: '', text: '' }],
    restrictedNeighborhood: [{ value: '', text: '' }],
    restrictedSex: [{ value: '', text: '' }],
    restrictedSize: [{ value: '', text: '' }],
    restrictedSpecie: [{ value: '', text: '' }],
  }); // Datos para los selectores
  const [visible, { open, close }] = useDisclosure(false);
  const { edit } = useAppointment();
  // Función para cancelar y volver al listado
  const handleOnCancel = () => {
    cancelFunc();
  };

  // Manejador del envío del formulario
  const handleOnSubmit = async (values: EditFormValues) => {
    open();
    await edit(values, appointment.ID_appointment);
    cancelFunc();
    onSubmit();
    close();
  };

  // Inicialización de valores del formulario
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSelectData(appointment);
        setSelectsData(data);
        const dateWithoutTimezone = new Date(appointment.date + 'T00:00:00');

        const settings: typeof form.values = {
          lastName: appointment.lastName,
          name: appointment.name,
          dni: appointment.dni,
          phone: appointment.phone,
          home: appointment.home,
          neighborhood: appointment.neighborhood.ID_neighborhood.toString(),
          size: appointment.size,
          sex: appointment.sex,
          specie: appointment.specie.ID_specie.toString(),
          date: dateWithoutTimezone,
          hour: appointment.hour,
          observations: appointment.observations || '',
          status: appointment.status,
        };
        console.log(settings);
        form.setValues(settings);
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
                  onChangeDateFunc={(date) => {
                    setActualDate(date);
                    form.setValues({ date: date });
                  }}
                />

                {
                  <HourSelect
                    form={form}
                    dateValue={actualDate}
                    registerId={appointment.ID_appointment}
                  />
                }

                {/* Campos para datos de la mascota */}
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
                <FormColumn
                  inputType="select"
                  form={form}
                  name="status"
                  span={3}
                  data={selectsData.status}
                  label="Estado: "
                  onChangeSelectFunc={(e) => {
                    setActualStatus(e.currentTarget.value);
                    form.setValues({
                      status: e.currentTarget.value,
                      reason: e.currentTarget.value === 'Cancelado' ? '' : null,
                    });
                  }}
                />
                {actualStatus !== 'Pendiente' ? (
                  <FormColumn
                    form={form}
                    inputType="select"
                    name="reason"
                    span={3}
                    label="Razón: "
                    data={selectsData.reason}
                    onChangeSelectFunc={(e) => {
                      form.setValues({ reason: e.currentTarget.value });
                    }}
                  />
                ) : (
                  <></>
                )}

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

export default EditAppointment;
