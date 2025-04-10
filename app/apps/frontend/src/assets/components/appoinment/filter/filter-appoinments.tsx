import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Grid,
  LoadingOverlay,
  Modal,
  NativeSelect,
  Pagination,
  Table,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import styles from './filter-appoinments.module.css';
import { DatePickerInput, DatesProvider } from '@mantine/dates';
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
import { error } from 'console';
import { notifications } from '@mantine/notifications';
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
  const [findBy, setFindBy] = useState<string>('owner');
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

  const handleLoadingText = () => {
    if (isLoading === 'loading') {
      return {
        color: '#000',
        text: 'Filtrando...',
      };
    } else if (isLoading === 'loaded') {
      return {
        color: '#69c266',
        text: 'Filtrado',
      };
    } else if (isLoading === 'error') {
      return {
        color: '#e84b4b',
        text: 'Algo salio mal... Intentalo de nuevo.',
      };
    } else {
      return {
        text: '',
        color: '',
      };
    }
  };

  const filterAppoinments = (params: FilterParams = {}) => {
    try {
      if (params.input) {
        const { input, ...otherParams } = params;
        const newObject = {
          [findBy]: input,
          ...otherParams,
        };
        axios
          .get('http://localhost:3000/api/appoinment', {
            params: newObject,
          })
          .then((res) => {
            setAppoinmentData(res.data);
          });
      } else {
        axios
          .get('http://localhost:3000/api/appoinment', {
            params,
          })
          .then((res) => {
            setAppoinmentData(res.data);
          });
      }
    } catch (err) {
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
  const handleOnSubmit = () => {
    try {
      startLoadingRows();
      setIsLoading('loading');

      const params: FilterParams = Object.fromEntries(
        Object.entries(form!.getValues()).filter(
          ([key, value]) => value != null && value != ''
        )
      );
      filterAppoinments(params);
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
      const today = new Intl.DateTimeFormat('es-AR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(new Date());

      const tooltipLabel = canEdit
        ? `No puede editar registros anteriores al ${today}`
        : 'Editar Registro';
      const twoNames = appoinment.owner.split(',');
      const canDelete = appoinment.status === 'Pendiente' ? false : true;
      const deleteLabel = canDelete
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
                    navigate('/turnos/cargar');
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
                    <Grid.Col span={5}>
                      <DatePickerInput
                        key={form.key('startDate')}
                        {...form.getInputProps('startDate')}
                        label="Intervalo de Fecha:"
                        placeholder="Desde"
                      />
                    </Grid.Col>
                    <Grid.Col span={5}>
                      <DatePickerInput
                        label=" "
                        placeholder="Hasta"
                        key={form.key('endDate')}
                        {...form.getInputProps('endDate')}
                      />
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <NativeSelect
                        onChange={(e) => {
                          setFindBy(e.currentTarget.value);
                          console.log(e.currentTarget.value);
                        }}
                        value={findBy}
                        label="Buscar por: "
                      >
                        <option value="dni">DNI</option>
                        <option value="owner">Nombre y Apellido</option>
                      </NativeSelect>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <TextInput
                        key={form.key('input')}
                        {...form.getInputProps('input')}
                        placeholder="Buscar"
                        label="Ingresar: "
                      />
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <NativeSelect
                        label="Sexo"
                        key={form.key('sex')}
                        {...form.getInputProps('sex')}
                      >
                        <option value="" style={{ color: '#aaa' }}>
                          Todos
                        </option>
                        <option value="Macho">Macho</option>
                        <option value="Hembra">Hembra</option>
                      </NativeSelect>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <NativeSelect
                        label="Raza"
                        key={form.key('race')}
                        {...form.getInputProps('race')}
                      >
                        <option value="" style={{ color: '#aaa' }}>
                          Todas
                        </option>
                        <option value="Canino">Canino</option>
                        <option value="Felino">Felino</option>
                      </NativeSelect>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <NativeSelect
                        label="Tamaño"
                        key={form.key('size')}
                        {...form.getInputProps('size')}
                      >
                        <option value="" style={{ color: '#aaa' }}>
                          Todos
                        </option>
                        <option value="Grande">Grande</option>
                        <option value="Mediano">Mediano</option>
                        <option value="Pequeño">Pequeño</option>
                      </NativeSelect>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <NativeSelect
                        label="Barrio"
                        key={form.key('neighborhood')}
                        {...form.getInputProps('neighborhood')}
                      >
                        <option value="" style={{ color: '#aaa' }}>
                          Todos
                        </option>
                        {neighborhoodOptions()}
                      </NativeSelect>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <NativeSelect
                        label="Estado"
                        key={form.key('status')}
                        {...form.getInputProps('status')}
                      >
                        <option value="" style={{ color: '#aaa' }}>
                          Todos
                        </option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Realizado">Realizado</option>
                        <option value="Cancelado">Cancelado</option>
                        <option value="Ausentado">Ausentado</option>
                        <option value="Esperando Actualización">
                          Esperando Actualización
                        </option>
                      </NativeSelect>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <NativeSelect
                        label="Ordenar por: "
                        key={form.key('orderBy')}
                        {...form.getInputProps('orderBy')}
                      >
                        <option value="id-asc">
                          Fecha de carga(Ascendente)
                        </option>
                        <option value="id-desc">
                          Fecha de carga(Descendente)
                        </option>
                        <option value="owner-asc">Dueño(A-Z)</option>
                        <option value="owner-desc">Dueño(Z-A)</option>
                        <option value="date-asc">Fecha(Ascendente)</option>
                        <option value="date-desc">Fecha(Descendente)</option>
                      </NativeSelect>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <NativeSelect
                        label="Hora: "
                        key={form.key('onlyByHour')}
                        {...form.getInputProps('onlyByHour')}
                      >
                        <option value="">Todas</option>
                        <option value="08:00:00">8:00</option>
                        <option value="10:00:00">10:00</option>
                        <option value="12:00:00">12:00</option>
                      </NativeSelect>
                    </Grid.Col>

                    <Grid.Col span={2}></Grid.Col>
                    <Grid.Col span={5}>
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

                    <Grid.Col span={5}>
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
                <Text fw={700} c={handleLoadingText().color}>
                  {handleLoadingText().text}
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
