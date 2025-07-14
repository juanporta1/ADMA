import { useContext, useEffect, useState } from 'react';
import styles from './castration.module.css';
import { MainColorContext } from '../../../contexts/color-context';
import {
  Box,
  Button,
  Flex,
  Grid,
  LoadingOverlay,
  Modal,
  Pagination,
  Table,
  Text,
} from '@mantine/core';
import Title from '../../utilities/title/title';
import { AppointmentContext } from '../../../contexts/appointment-context';
import FormColumn from '../../utilities/form-column/form-column';

import DateFilter from '../appointment/filter/date-filter/date-filter';
import useAppointment from '../../../hooks/appointment/use-appointment/use-appointment';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import useSelectsData from '../../../hooks/appointment/use-selects-data/use-selects-data';
import CastrationRow from './utilities/castration-row';
import useGetLoadingText from '../../../hooks/appointment/filter/get-loading-text/get-loading-text';
import { Appointment } from '../../../types/entities.types';
import { AppoinmentSelects } from '../../../types/utilities.types';

export interface FilterParams {
  sex?: string; // Sexo de la mascota
  specie?: number; // Especie de la mascota
  size?: string; // Tamaño de la mascota
  neighborhood?: string; // Barrio
  startDate?: Date; // Fecha de inicio del filtro
  endDate?: Date; // Fecha de fin del filtro
  hour?: string; // Hora del turno
  input?: string; // Texto de búsqueda
  orderBy?: string; // Ordenar por campo
  byHour?: string; // Filtrar por hora específica
  status?: string; // Estado del turno
  findBy?: 'dni' | 'owner'; // Buscar por DNI o dueño
  dateFilterWay?: 'all' | 'onlyOne' | 'interval';
  date?: Date;
}

// Interfaz para la estructura de un turno

export function Castration() {
  // Estado para almacenar los turnos obtenidos
  const [appointmentData, setAppointmentData] = useState<Appointment[]>([]);
  // Estado para controlar el texto de carga
  const [isLoading, setIsLoading] = useState<string | null>(null);
  // Estado para la página actual de la paginación
  const [actualPage, setPage] = useState(1);
  const [dateFilterWay, setDateFilterWay] = useState<
    'all' | 'interval' | 'onlyOne'
  >('all');
  // Estado y funciones para mostrar/ocultar el overlay de carga de filas
  const [loadingRows, { open: startLoadingRows, close: finishLoadingRows }] =
    useDisclosure(false);
  // Hook para navegar entre rutas
  const navigate = useNavigate();
  //Estado y funciones para mostrar/ocultar el modal de eliminación y edicion
  const [
    featuresModal,
    { open: openFeaturesModal, close: closeFeaturesModal },
  ] = useDisclosure(false);
  const [
    observationsModal,
    { open: openObservationsModal, close: closeObservationsModal },
  ] = useDisclosure(false);
  // Estado para almacenar el turno seleccionado para eliminar

  const [actualRegister, setActualRegister] = useState<Appointment>();

  const [columnsValues, setColumnsValues] = useState<string[]>([
    'Dueño',
    'Fecha',
    'Hora',
    'DNI',
    'Teléfono',
    'Barrio',
    'Domicilio',
    'Sexo',
    'Tamaño',
    'Especie',
  ]);

  // Cantidad de registros por página
  const registersPerPage = 7;
  // Contexto del formulario de filtros
  const form = useContext(AppointmentContext);

  // Contexto para el color principal de la aplicación
  const mainColor = useContext(MainColorContext);
  // Hook para obtener los datos de los selectores del filtro
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
    age: [{ value: '', text: '' }],
    veterinarian: [{ value: '', text: '' }],
  });
  // Hook para filtrar turnos
  const { filter } = useAppointment();

  // Función para limpiar los filtros y volver a listar todos los turnos
  const handleOnReset = () => {
    form!.reset();
    setDateFilterWay('all');
    handleOnSubmit();
  };

  // Función para eliminar un turno seleccionado

  // Función para enviar el formulario de filtros y obtener los turnos filtrados
  const handleOnSubmit = async () => {
    try {
      startLoadingRows();
      setIsLoading('loading');

      // Obtiene los valores del formulario y filtra los que no están vacíos
      const params: FilterParams = Object.fromEntries(
        Object.entries(form!.getValues()).filter(
          ([key, value]) => value != null && value != ''
        )
      );
      console.log(params);

      // Llama al hook para filtrar los turnos
      const data = await filter({ ...params, status: 'Realizado' });
      if (!data) {
        setIsLoading('error');
        finishLoadingRows();
        return params;
      }
      setAppointmentData(data.data);
      finishLoadingRows();
      setPage(1);
      setIsLoading('loaded');
      return params;
    } catch (err) {
      setIsLoading('error');
      finishLoadingRows();
      setPage(1);
      console.log(err);
      return {};
    }
  };

  // Componente interno para renderizar las filas de la tabla de turnos
  const Rows = () => {
    // Calcula los datos a mostrar según la página actual
    const paginationData = appointmentData.slice(
      (actualPage - 1) * registersPerPage,
      actualPage * registersPerPage
    );

    // Mapea cada turno a una fila de la tabla
    return paginationData.map((appointment) => (
      <CastrationRow
        appointment={appointment}
        key={appointment.ID_appointment}
        clickSeeFeaturesFunc={() => {
          setActualRegister(appointment);
          openFeaturesModal();
        }}
        clickSeeObservationFunc={() => {
          setActualRegister(appointment);
          openObservationsModal();
        }}
      />
    ));
  };

  // useEffect para cargar los turnos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSelectData();
        setSelectsData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    handleOnSubmit();

    console.log(mainColor);
  }, []);

  // useEffect para limpiar el estado de carga después de un tiempo
  useEffect(() => {
    if (isLoading !== null) {
      const timeout = setTimeout(() => {
        setIsLoading(null);
      }, 2000);
      return () => clearTimeout(timeout);
    } else {
      return () => {};
    }
  }, [isLoading]);

  // Renderizado principal del componente

  if (form) {
    return (
      <Box>
        <Modal
          opened={observationsModal}
          onClose={closeObservationsModal}
          centered
          withCloseButton={false}
        >
          <Flex direction={'column'} gap={'xl'}>
            <Title text="Observaciones" c={mainColor} />
            <Text>{actualRegister?.castration?.observations}</Text>
            <Button
              color={mainColor}
              variant="light"
              onClick={closeObservationsModal}
            >
              Volver
            </Button>
          </Flex>
        </Modal>
        <Modal
          opened={featuresModal}
          onClose={closeFeaturesModal}
          centered
          withCloseButton={false}
        >
          <Flex direction={'column'} gap={'xl'}>
            <Title text="Características" c={mainColor} />
            <Text>{actualRegister?.castration?.features}</Text>
            <Button
              color={mainColor}
              variant="light"
              onClick={closeFeaturesModal}
            >
              Volver
            </Button>
          </Flex>
        </Modal>
        <Flex direction="column" gap="md">
          <Flex direction="row" justify="space-between">
            <Title text="Castraciones" c={mainColor} />
            {/*Acá se pueden agregar botonciotos y algún piripipi*/}
          </Flex>

          <Box bd="1px #aaa solid" p="sm">
            <form onSubmit={form.onSubmit(handleOnSubmit)}>
              <Grid gutter="10px" columns={20}>
                <FormColumn
                  form={form}
                  inputType="select"
                  name="dateFilterWay"
                  span={4}
                  notRequired
                  label="Filtros por fecha: "
                  data={selectsData.dateFilterWay}
                  onChangeSelectFunc={(e) => {
                    setDateFilterWay(
                      e.currentTarget.value as 'all' | 'interval' | 'onlyOne'
                    );
                    form.setValues({
                      dateFilterWay: e.currentTarget.value,
                      date: null,
                      startDate: null,
                      endDate: null,
                    });
                  }}
                />
                {<DateFilter type={dateFilterWay} form={form} />}
                {/* Selector para buscar por DNI o dueño */}
                <FormColumn
                  form={form}
                  inputType="select"
                  label=" "
                  name="findBy"
                  span={4}
                  data={selectsData.findBy}
                  notRequired
                />
                {/* Campo de texto para búsqueda */}
                <FormColumn
                  inputType="text"
                  form={form}
                  name="input"
                  span={6}
                  placeholder="Buscar"
                  label="Ingresar: "
                  notRequired
                />
                {/* Selector de sexo */}
                <FormColumn
                  span={5}
                  name="sex"
                  label="Sexo"
                  form={form}
                  inputType="select"
                  data={selectsData.sex}
                  notRequired
                />

                {/* Selector de especie */}
                <FormColumn
                  span={5}
                  name="specie"
                  label="Especie"
                  form={form}
                  inputType="select"
                  data={selectsData.specie}
                  notRequired
                />
                {/* Selector de tamaño */}
                <FormColumn
                  span={5}
                  name="size"
                  label="Tamaño"
                  form={form}
                  inputType="select"
                  data={selectsData.size}
                  notRequired
                />
                {/* Selector de barrio */}
                <FormColumn
                  span={5}
                  name="neighborhood"
                  label="Barrio"
                  form={form}
                  inputType="select"
                  data={selectsData.neighborhood}
                  notRequired
                />

                {/* Selector para ordenar por campo */}
                <FormColumn
                  span={4}
                  name="orderBy"
                  label="Ordenar por: "
                  form={form}
                  inputType="select"
                  data={selectsData.orderBy}
                  notRequired
                />
                {/* Selector de hora */}
                <FormColumn
                  span={4}
                  name="byHour"
                  label="Hora: "
                  form={form}
                  inputType="select"
                  data={selectsData.hour}
                  notRequired
                />

                <FormColumn
                  span={4}
                  name="animalName"
                  label="Nombre de la Mascota:"
                  form={form}
                  inputType="text"
                  placeholder="Buscar"
                  notRequired
                />
                <Grid.Col span={12}></Grid.Col>
                {/* Botón para listar los turnos filtrados */}
                <Grid.Col span={4}>
                  <Flex direction="column" justify="flex-end" h="100%">
                    <Button
                      type="submit"
                      fullWidth
                      variant="filled"
                      color={mainColor}
                    >
                      Listar
                    </Button>
                  </Flex>
                </Grid.Col>

                {/* Botón para limpiar los filtros */}
                <Grid.Col span={4}>
                  <Flex direction="column" justify="flex-end" h="100%">
                    <Button
                      onClick={handleOnReset}
                      fullWidth
                      variant="outline"
                      color={mainColor}
                    >
                      Limpiar Filtro
                    </Button>
                  </Flex>
                </Grid.Col>
              </Grid>
            </form>
          </Box>
        </Flex>
        <Box>
          {/* Texto de estado de carga */}
          <Text fw={700} c={useGetLoadingText(isLoading).color}>
            {useGetLoadingText(isLoading).text}
          </Text>

          {/* Si no hay datos, mostrar mensaje */}
          {appointmentData.length === 0 ? (
            <Text fw={700} size="lg">
              Ningun registro coincide con los parametros
            </Text>
          ) : (
            <div>
              {/* Tabla de resultados */}
              <div style={{ minHeight: `${(registersPerPage + 1) * 45}px` }}>
                {/* Overlay de carga mientras se obtienen los datos */}
                <LoadingOverlay visible={loadingRows} zIndex={10} />
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Fecha</Table.Th>
                      <Table.Th>Hora</Table.Th>
                      <Table.Th>Apellido</Table.Th>
                      <Table.Th>Nombre</Table.Th>
                      <Table.Th>DNI</Table.Th>
                      <Table.Th>Telefono</Table.Th>
                      <Table.Th>Domicilio</Table.Th>
                      <Table.Th>Barrio</Table.Th>
                      <Table.Th>Especie</Table.Th>
                      <Table.Th>Sexo</Table.Th>
                      <Table.Th>Tamaño</Table.Th>
                      <Table.Th>Nombre del Animal</Table.Th>
                      <Table.Th>Peso</Table.Th>
                      <Table.Th>Edad</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  {/* Renderizado de filas de la tabla */}
                  <Table.Tbody>{<Rows></Rows>}</Table.Tbody>
                </Table>
              </div>
              {/* Paginación de los resultados */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '10px',
                }}
              >
                <Pagination
                  total={Math.ceil(appointmentData.length / registersPerPage)}
                  value={actualPage}
                  onChange={setPage}
                  color={mainColor}
                />
              </div>
            </div>
          )}
        </Box>
      </Box>
    );
  }
}

export default Castration;
