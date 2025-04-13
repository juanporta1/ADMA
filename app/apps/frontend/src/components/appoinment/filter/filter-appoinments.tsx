import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Grid,
  LoadingOverlay,
  Modal,
  Pagination,
  Table,
  Text,
  Tooltip,
} from '@mantine/core';

import { DatesProvider } from '@mantine/dates';
import 'dayjs/locale/es';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useDisclosure, useSet } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import Title from '../../utilities/title/title';
import { AppoinmentContext } from '../../../contexts/appoinment-context';
import { MainColorContext } from '../../../contexts/color-context';

import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { notifications } from '@mantine/notifications';
import FormColumn from '../../utilities/form-column/form-column';

import useGetLoadingText from '../../../hooks/appoinment/filter/get-loading-text/get-loading-text';
import useGetFilterSelectsData from '../../../hooks/appoinment/filter/get-filter-selects-data/get-filter-selects-data';
import useFilterAppoinments from '../../../hooks/appoinment/filter/use-filter-appoinments/use-filter-appoinments';

class FilterParams {
  sex?: string;
  race?: string;
  size?: string;
  neighborhood?: string;
  startDate?: Date;
  endDate?: Date;
  input?: string;
  orderBy?: string;
  onlyByHour?: string;
  findBy?: 'dni' | 'owner';
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
  status!:
    | 'Pendiente'
    | 'Cancelado'
    | 'Ausentado'
    | 'Realizado'
    | 'Esperando Actualización';
  observations!: string | null;
  reason!: string | null;
}

export function FilterAppoinments() {
  const [appoinmentData, setAppoinmentData] = useState<Appoinment[]>([]);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [actualPage, setPage] = useState(1);
  const [loadingRows, { open: startLoadingRows, close: finishLoadingRows }] =
    useDisclosure(false);
  const navigate = useNavigate();
  const [deleteModal, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);
  const [actualRegister, setActualRegister] = useState<Appoinment>();
  const registersPerPage = 7;
  const form = useContext(AppoinmentContext);
  const mainColor = useContext(MainColorContext);
  const selectsData = useGetFilterSelectsData();
  const { filterAppoinments } = useFilterAppoinments();
  const handleOnReset = () => {
    form!.reset();
    handleOnSubmit();
  };
  const handleOnDelete = () => {
    try {
      if (actualRegister) {
        axios
          .delete(
            `http://localhost:3000/api/appoinment/${actualRegister.ID_appoinment}`
          )
          .then((res) => {
            console.log(res.data);
            notifications.show({
              title: 'Se ha eliminado el registro',
              message: 'La operacion ha sido exitosa',
              color: 'green',
            });
          })
          .catch((err) => {
            notifications.show({
              title: 'Ha ocurrido un error',
              message: 'Ha pasado algo en el proceso de eliminar el registro',
              color: 'red',
            });
          });
        closeDeleteModal();
        handleOnSubmit();
      }
    } catch (err) {
      throw err;
    }
  };
  const handleOnSubmit = async () => {
    try {
      startLoadingRows();
      setIsLoading('loading');

      const params: FilterParams = Object.fromEntries(
        Object.entries(form!.getValues()).filter(
          ([key, value]) => value != null && value != ''
        )
      );
      const data = await filterAppoinments(params);
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

  const Rows = () => {
    const paginationData = appoinmentData.slice(
      (actualPage - 1) * registersPerPage,
      actualPage * registersPerPage
    );

    return paginationData.map((appoinment) => {
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

      const canEdit =
        appoinment.status === 'Pendiente' ||
        appoinment.status === 'Esperando Actualización'
          ? false
          : true;

      const tooltipLabel = canEdit
        ? `No puede editar este registro.`
        : 'Editar Registro';
      const twoNames = appoinment.owner.split(',');
      const canDelete = appoinment.status === 'Pendiente' ? false : true;
      const deleteLabel = !canDelete
        ? 'Borrar'
        : 'No puede borrar este registro';
      return (
        <Table.Tr style={{ maxHeight: '50px' }} key={appoinment.ID_appoinment}>
          <Table.Td>{formattedDate}</Table.Td>
          <Table.Td>{formattedTime}</Table.Td>
          <Table.Td>{twoNames[0]}</Table.Td>
          <Table.Td>{twoNames[1]}</Table.Td>
          <Table.Td>{appoinment.dni}</Table.Td>
          <Table.Td>{appoinment.home}</Table.Td>
          <Table.Td>{appoinment.phone}</Table.Td>
          <Table.Td>{appoinment.neighborhood}</Table.Td>
          <Table.Td>{appoinment.race}</Table.Td>
          <Table.Td>{appoinment.sex}</Table.Td>
          <Table.Td>{appoinment.size}</Table.Td>
          <Table.Td>{appoinment.status}</Table.Td>
          <Table.Td c={appoinment.reason ? '#000' : '#aaaa'}>
            {appoinment.reason ? appoinment.reason : 'Sin Razon'}
          </Table.Td>
          <Table.Td>
            <Tooltip label={tooltipLabel}>
              <ActionIcon
                onClick={() => {
                  navigate(`/turnos/editar/${appoinment.ID_appoinment}`);
                }}
                color={mainColor}
                disabled={canEdit}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </ActionIcon>
            </Tooltip>
          </Table.Td>
          <Table.Td>
            <Tooltip label={deleteLabel}>
              <ActionIcon
                onClick={() => {
                  openDeleteModal();
                  setActualRegister(appoinment);
                }}
                color={mainColor}
                disabled={canEdit}
              >
                <FontAwesomeIcon icon={faTrash} />
              </ActionIcon>
            </Tooltip>
          </Table.Td>
        </Table.Tr>
      );
    });
  };

  useEffect(() => {
    handleOnSubmit();
    console.log(mainColor);
  }, []);

  useEffect(() => {
    if (isLoading !== null) {
      const timeout = setTimeout(() => {
        setIsLoading(null);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [isLoading]);
  if (form) {
    return (
      <div>
        <Modal
          opened={deleteModal}
          onClose={closeDeleteModal}
          title="¿Seguro quiere borrar este registro?"
          centered
        >
          <Flex gap="xl" justify="center" align="center">
            <Button variant="light" color={mainColor} onClick={handleOnDelete}>
              Sí, estoy seguro
            </Button>
            <Button
              variant="filled"
              color={mainColor}
              onClick={closeDeleteModal}
            >
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
          <Box>
            <Flex direction="column" gap="md">
              <Flex direction="row" gap="lg">
                <Title text="Turnos" c={mainColor} />
                <Button
                  onClick={() => {
                    navigate('/turnos/nuevo');
                  }}
                  color={mainColor}
                  variant="filled"
                >
                  Nuevo
                </Button>
              </Flex>

              <Box bd="1px #aaa solid" p="sm">
                <form onSubmit={form.onSubmit(handleOnSubmit)}>
                  <Grid gutter="10px" columns={20}>
                    <FormColumn
                      form={form}
                      inputType="date"
                      name="startDate"
                      span={5}
                      label="Intervalo de Fecha"
                      placeholder="Desde"
                    />

                    <FormColumn
                      label=" "
                      placeholder="Hasta"
                      name="endDate"
                      form={form}
                      inputType="date"
                      span={5}
                    />
                    <FormColumn
                      form={form}
                      inputType="select"
                      label=" "
                      name="findBy"
                      span={4}
                      data={selectsData.findBy}
                    />
                    <FormColumn
                      inputType="text"
                      form={form}
                      name="input"
                      span={6}
                      placeholder="Buscar"
                      label="Ingresar: "
                    />
                    <FormColumn
                      span={4}
                      name="sex"
                      label="Sexo"
                      form={form}
                      inputType="select"
                      data={selectsData.sex}
                    />
                    <FormColumn
                      span={4}
                      name="race"
                      label="Especie"
                      form={form}
                      inputType="select"
                      data={selectsData.race}
                    />
                    <FormColumn
                      span={4}
                      name="size"
                      label="Tamaño"
                      form={form}
                      inputType="select"
                      data={selectsData.size}
                    />
                    <FormColumn
                      span={4}
                      name="neighborhood"
                      label="Barrio"
                      form={form}
                      inputType="select"
                      data={selectsData.neighborhood}
                    />
                    <FormColumn
                      span={4}
                      name="status"
                      label="Estado"
                      form={form}
                      inputType="select"
                      data={selectsData.status}
                    />

                    <FormColumn
                      span={5}
                      name="orderBy"
                      label="Ordenar por: "
                      form={form}
                      inputType="select"
                      data={selectsData.orderBy}
                    />
                    <FormColumn
                      span={5}
                      name="onlyByHour"
                      label="Hora: "
                      form={form}
                      inputType="select"
                      data={selectsData.hour}
                    />
                    <Grid.Col span={2}></Grid.Col>

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

              <Box>
                <Text fw={700} c={useGetLoadingText(isLoading).color}>
                  {useGetLoadingText(isLoading).text}
                </Text>
                <LoadingOverlay visible={loadingRows} zIndex={1000} />
                {appoinmentData.length === 0 ? (
                  <Text fw={700} size="lg">
                    Ningun registro coincide con los parametros
                  </Text>
                ) : (
                  <div>
                    <div
                      style={{ minHeight: `${(registersPerPage + 1) * 50}px` }}
                    >
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
                            <Table.Th>Raza</Table.Th>
                            <Table.Th>Sexo</Table.Th>
                            <Table.Th>Tamaño</Table.Th>
                            <Table.Th>Estado</Table.Th>
                            <Table.Th>Razón</Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{<Rows></Rows>}</Table.Tbody>
                      </Table>
                    </div>
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
  }
}

export default FilterAppoinments;
