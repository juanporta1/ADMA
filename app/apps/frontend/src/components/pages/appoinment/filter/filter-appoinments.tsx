// Importación de componentes de Mantine para la interfaz de usuario
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

// Importación de proveedor de fechas y configuración de idioma
import { DatesProvider } from '@mantine/dates';
import 'dayjs/locale/es';

// Importación de hooks de React y utilidades de navegación
import { useContext, useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';

// Importación de componentes y contextos personalizados
import Title from '../../../utilities/title/title';
import { AppoinmentContext } from '../../../../contexts/appoinment-context';
import { MainColorContext } from '../../../../contexts/color-context';
import FormColumn from '../../../utilities/form-column/form-column';

// Importación de hooks personalizados para lógica de turnos
import useGetLoadingText from '../../../../hooks/appoinment/filter/get-loading-text/get-loading-text';
import useGetFilterSelectsData from '../../../../hooks/appoinment/filter/get-filter-selects-data/get-filter-selects-data';
import AppoinmentRow from '../utilities/appoinment-row/appoinment-row';
import DeleteModal from './delete-modal/delete-modal';
import EditAppoinment from '../edit/edit-appoinment';
import { useAppoinment } from '../../../../hooks/appoinment/use-appoinment/use-appoinment';

// Interfaz para los parámetros de filtrado de turnos
export interface FilterParams {
  sex?: string; // Sexo de la mascota
  specie?: string; // Especie de la mascota
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
}

// Interfaz para la estructura de un turno
export interface Appoinment {
  ID_appoinment: number; // ID único del turno
  owner: string; // Nombre del dueño
  home: string; // Domicilio
  neighborhood: string; // Barrio
  phone: string | null; // Teléfono
  dni: string; // DNI del dueño
  date: Date; // Fecha del turno
  hour: string; // Hora del turno
  size: 'Grande' | 'Pequeño' | 'Mediano'; // Tamaño de la mascota
  sex: 'Macho' | 'Hembra'; // Sexo de la mascota
  specie: 'Canino' | 'Felino'; // Especie de la mascota
  status:
    | 'Pendiente'
    | 'Cancelado'
    | 'Ausentado'
    | 'Esperando Actualización'
    | 'En Proceso'
    | 'Realizado'
    | 'No Realizado'; // Estado del turno
  observations: string | null; // Observaciones adicionales
  reason: string | null; // Razón de cancelación u otra
}

// Componente principal para filtrar y mostrar turnos
export function FilterAppoinments() {
  // Estado para almacenar los turnos obtenidos
  const [appoinmentData, setAppoinmentData] = useState<Appoinment[]>([]);
  // Estado para controlar el texto de carga
  const [isLoading, setIsLoading] = useState<string | null>(null);
  // Estado para la página actual de la paginación
  const [actualPage, setPage] = useState(1);
  // Estado y funciones para mostrar/ocultar el overlay de carga de filas
  const [loadingRows, { open: startLoadingRows, close: finishLoadingRows }] =
    useDisclosure(false);
  // Hook para navegar entre rutas
  const navigate = useNavigate();
  // Estado y funciones para mostrar/ocultar el modal de eliminación y edicion
  const [deleteModal, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);
  const [editModal, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  const [
    observationsModal,
    { open: openObservationsModal, close: closeObservationsModal },
  ] = useDisclosure(false);
  // Estado para almacenar el turno seleccionado para eliminar

  const [actualRegister, setActualRegister] = useState<Appoinment>();
  // Cantidad de registros por página
  const registersPerPage = 7;
  // Contexto del formulario de filtros
  const form = useContext(AppoinmentContext);
  // Contexto para el color principal de la aplicación
  const mainColor = useContext(MainColorContext);
  // Hook para obtener los datos de los selectores del filtro
  const selectsData = useGetFilterSelectsData();
  // Hook para filtrar turnos
  const { filter, remove } = useAppoinment();
  
  // Función para limpiar los filtros y volver a listar todos los turnos
  const handleOnReset = () => {
    form!.reset();
    handleOnSubmit();
  };

  // Función para eliminar un turno seleccionado
  const handleOnDelete = async () => {
    if (actualRegister) {
      await remove(actualRegister.ID_appoinment);
      closeDeleteModal();
      handleOnSubmit();
    }
  };

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
      const data = await filter(params);
      if (!data) {
        setIsLoading('error');
        finishLoadingRows();
        return;
      }
      setAppoinmentData(data);
      finishLoadingRows();
      setPage(1);
      setIsLoading('loaded');
    } catch (err) {
      setIsLoading('error');
      finishLoadingRows();
      setPage(1);
      throw err;
    }
  };

  // Componente interno para renderizar las filas de la tabla de turnos
  const Rows = () => {
    // Calcula los datos a mostrar según la página actual
    const paginationData = appoinmentData.slice(
      (actualPage - 1) * registersPerPage,
      actualPage * registersPerPage
    );

    // Mapea cada turno a una fila de la tabla
    return paginationData.map((appoinment) => (
      <AppoinmentRow
        appoinment={appoinment}
        key={appoinment.ID_appoinment}
        clickDeleteFunc={() => {
          setActualRegister(appoinment);
          openDeleteModal();
        }}
        clickEditFunc={() => {
          setActualRegister(appoinment);
          openEditModal();
        }}
        clickSeeObservationFunc={() => {
          setActualRegister(appoinment);
          openObservationsModal();
        }}
      />
    ));
  };

  // useEffect para cargar los turnos al montar el componente
  useEffect(() => {
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
      <div>
        {/* Modal para confirmar la eliminación de un turno */}
        <DeleteModal
          onClose={closeDeleteModal}
          handleOnDelete={handleOnDelete}
          opened={deleteModal}
        />
        <Modal
          title="Editar Informacion Del Turno"
          opened={editModal}
          onClose={closeEditModal}
          centered
          size="1000px"
        >
          <EditAppoinment
            appoinment={actualRegister!}
            cancelFunc={closeEditModal}
            onSubmit={handleOnSubmit}
          />
        </Modal>
        <Modal
          opened={observationsModal}
          onClose={closeObservationsModal}
          centered
          withCloseButton={false}
        >
          <Flex direction={'column'} gap={'xl'}>
            <Title text="Observaciones" c={mainColor} />
            <Text>{actualRegister?.observations}</Text>
            <Button
              color={mainColor}
              variant="light"
              onClick={closeObservationsModal}
            >
              Voler
            </Button>
          </Flex>
        </Modal>
        {/* Proveedor de configuración de fechas */}
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
              {/* Encabezado con título y botón para crear nuevo turno */}
              <Flex direction="row" justify="space-between">
                <Title text="Turnos" c={mainColor} />
                <Button
                  onClick={() => {
                    navigate('/turnos/nuevo');
                  }}
                  color={mainColor}
                  variant="filled"
                  style={{ width: '200px' }}
                >
                  Nuevo
                </Button>
              </Flex>

              {/* Formulario de filtros */}
              <Box bd="1px #aaa solid" p="sm">
                <form onSubmit={form.onSubmit(handleOnSubmit)}>
                  <Grid gutter="10px" columns={20}>
                    {/* Campo para fecha de inicio */}
                    <FormColumn
                      form={form}
                      inputType="date"
                      name="startDate"
                      span={5}
                      label="Intervalo de Fecha"
                      placeholder="Desde"
                      notRequired
                    />

                    {/* Campo para fecha de fin */}
                    <FormColumn
                      label=" "
                      placeholder="Hasta"
                      name="endDate"
                      form={form}
                      inputType="date"
                      span={5}
                      notRequired
                    />
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
                      span={4}
                      name="sex"
                      label="Sexo"
                      form={form}
                      inputType="select"
                      data={selectsData.sex}
                      notRequired
                    />
                    {/* Selector de especie */}
                    <FormColumn
                      span={4}
                      name="specie"
                      label="Especie"
                      form={form}
                      inputType="select"
                      data={selectsData.specie}
                      notRequired
                    />
                    {/* Selector de tamaño */}
                    <FormColumn
                      span={4}
                      name="size"
                      label="Tamaño"
                      form={form}
                      inputType="select"
                      data={selectsData.size}
                      notRequired
                    />
                    {/* Selector de barrio */}
                    <FormColumn
                      span={4}
                      name="neighborhood"
                      label="Barrio"
                      form={form}
                      inputType="select"
                      data={selectsData.neighborhood}
                      notRequired
                    />
                    {/* Selector de estado */}
                    <FormColumn
                      span={4}
                      name="status"
                      label="Estado"
                      form={form}
                      inputType="select"
                      data={selectsData.status}
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
                      name="onlyByHour"
                      label="Hora: "
                      form={form}
                      inputType="select"
                      data={selectsData.hour}
                      notRequired
                    />
                    {/* Espacio vacío para alineación */}
                    <Grid.Col span={4}></Grid.Col>

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

              {/* Sección de resultados */}
              <Box>
                {/* Texto de estado de carga */}
                <Text fw={700} c={useGetLoadingText(isLoading).color}>
                  {useGetLoadingText(isLoading).text}
                </Text>

                {/* Si no hay datos, mostrar mensaje */}
                {appoinmentData.length === 0 ? (
                  <Text fw={700} size="lg">
                    Ningun registro coincide con los parametros
                  </Text>
                ) : (
                  <div>
                    {/* Tabla de resultados */}
                    <div
                      style={{ minHeight: `${(registersPerPage + 1) * 45}px` }}
                    >
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
                            <Table.Th>Domicilio</Table.Th>
                            <Table.Th>Telefono</Table.Th>
                            <Table.Th>Barrio</Table.Th>
                            <Table.Th>Especie</Table.Th>
                            <Table.Th>Sexo</Table.Th>
                            <Table.Th>Tamaño</Table.Th>
                            <Table.Th>Estado</Table.Th>
                            <Table.Th>Razón</Table.Th>
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
                        total={Math.ceil(
                          appoinmentData.length / registersPerPage
                        )}
                        value={actualPage}
                        onChange={setPage}
                        color={mainColor}
                      />
                    </div>
                  </div>
                )}
              </Box>
            </Flex>
          </Box>
        </DatesProvider>
      </div>
    );
  } else return <></>;
}

// Exportación del componente principal
export default FilterAppoinments;
