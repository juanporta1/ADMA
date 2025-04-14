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

import { DatesProvider } from '@mantine/dates';
import 'dayjs/locale/es';
import { useContext, useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import Title from '../../../utilities/title/title';
import { AppoinmentContext } from '../../../../contexts/appoinment-context';
import { MainColorContext } from '../../../../contexts/color-context';
import FormColumn from '../../../utilities/form-column/form-column';

import useGetLoadingText from '../../../../hooks/appoinment/filter/get-loading-text/get-loading-text';
import useGetFilterSelectsData from '../../../../hooks/appoinment/filter/get-filter-selects-data/get-filter-selects-data';
import useFilterAppoinments from '../../../../hooks/appoinment/filter/use-filter-appoinments/use-filter-appoinments';
import AppoinmentRow from '../utilities/appoinment-row/appoinment-row';
import useDeleteAppoinment from '../../../../hooks/appoinment/use-delete-appoinment/use-delete-appoinment';
import DeleteModal from './delete-modal/delete-modal';

export interface FilterParams {
  sex?: string;
  specie?: string;
  size?: string;
  neighborhood?: string;
  startDate?: Date;
  endDate?: Date;
  hour?: string;
  input?: string;
  orderBy?: string;
  byHour?: string;
  findBy?: 'dni' | 'owner';
}

export interface Appoinment {
  ID_appoinment: number;
  owner: string;
  home: string;
  neighborhood: string;
  phone: string;
  dni: string;
  date: string;
  hour: string;
  size: 'Grande' | 'Pequeño' | 'Mediano';
  sex: 'Macho' | 'Hembra';
  specie: 'Canino' | 'Felino';
  status:
    | 'Pendiente'
    | 'Cancelado'
    | 'Ausentado'
    | 'Realizado'
    | 'Esperando Actualización';
  observations: string | null;
  reason: string | null;
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
  const { deleteAppoinment } = useDeleteAppoinment();

  const handleOnReset = () => {
    form!.reset();
    handleOnSubmit();
  };
  const handleOnDelete = async () => {
    if (actualRegister) {
      await deleteAppoinment(actualRegister.ID_appoinment);
      closeDeleteModal();
      handleOnSubmit();
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

    return paginationData.map((appoinment) => (
      <AppoinmentRow
        appoinment={appoinment}
        key={appoinment.ID_appoinment}
        clickFunction={() => {
          openDeleteModal();
          setActualRegister(appoinment);
        }}
      />
    ));
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
        <DeleteModal onClose={closeDeleteModal} handleOnDelete={handleOnDelete} opened={deleteModal}/>
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
              <Flex direction="row" justify="space-between">
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
                      name="specie"
                      label="Especie"
                      form={form}
                      inputType="select"
                      data={selectsData.specie}
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
                            <Table.Th>Especie</Table.Th>
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
