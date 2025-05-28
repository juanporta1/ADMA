import { useContext, useEffect, useState } from 'react';
import useDataEntities from '../../../../../hooks/general/use-data-entities/use-data-entities';
import {
  editedAppointmentSchedule,
  newAppointmentSchedule,
  AppointmentSchedule,
} from '../../../../../types/data-entities.types';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Grid,
  Modal,
  Text,
  Title,
} from '@mantine/core';
import { MainColorContext } from '../../../../../contexts/color-context';
import { UserContext } from '../../../../../contexts/user-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import FormColumn from '../../../../utilities/form-column/form-column';

export function AddappointmentSchedule() {
  //Form
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      date: null as Date | null,
      hour: '',
      maxAppointments: 0,
    },
  });

  //Contexts
  const mainColor = useContext(MainColorContext);
  const { currentUser } = useContext(UserContext);
  //States
  const [appointmentSchedules, setAppointmentSchedules] = useState<
    AppointmentSchedule[]
  >([]);
  const [actualAppointmentSchedule, setActualAppointmentSchedule] =
    useState<AppointmentSchedule | null>(null);
  const { getData, createNewData, deleteData, editData } = useDataEntities();

  //Disclosures
  const [deleteModal, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);
  const [editModal, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);
  const [createModal, { open: openCreate, close: closeCreate }] =
    useDisclosure(false);

  //Functions
  const getAppointmentSchedules = async () => {
    const { appointmentSchedules } = await getData(['appointmentSchedules']);
    if (appointmentSchedules) {
      setAppointmentSchedules(appointmentSchedules);
      console.log('appointmentSchedules', appointmentSchedules);
    }
  };
  const handleOnCreate = async (values: {
    date: Date | null;
    hour: string;
    maxAppointments: number;
  }) => {
    await createNewData(
      values as newAppointmentSchedule,
      'appointment-schedule'
    );
    closeCreate();
    await getAppointmentSchedules();
  };

  const handleOnEdit = async (values: editedAppointmentSchedule) => {
    if (!actualAppointmentSchedule) return;
    console.log('actualappointmentSchedule', actualAppointmentSchedule);
    await editData(
      'appointment-schedule',
      actualAppointmentSchedule.ID_appointmentSchedule,
      values
    );

    await getAppointmentSchedules();
    closeEdit();
  };

  const handleOnDelete = async () => {
    if (!actualAppointmentSchedule) return;

    await deleteData(
      'appointment-schedule',
      actualAppointmentSchedule.ID_appointmentSchedule
    );
    await getAppointmentSchedules();
    closeDelete();
  };

  const appointmentScheduleItems = appointmentSchedules.map((v) => ({
    date: v.date,
    hour: v.hour,
    maxAppointments: v.maxAppointments,
    edit: (
      <ActionIcon
        color={mainColor}
        onClick={() => {
          openEdit();
          setActualAppointmentSchedule(v);
        }}
      >
        <FontAwesomeIcon icon={faEdit} />
      </ActionIcon>
    ),
    delete: (
      <ActionIcon
        color={mainColor}
        onClick={() => {
          openDelete();
          setActualAppointmentSchedule(v);
        }}
      >
        <FontAwesomeIcon icon={faTrash} />
      </ActionIcon>
    ),
  }));

  useEffect(() => {
    getAppointmentSchedules();
  }, []);

  useEffect(() => {
    if (editModal || createModal) form.reset();
  }, [editModal, createModal]);

  // Si
  useEffect(() => {
    if (editModal || createModal) form.reset();
  }, [editModal, createModal]);

  useEffect(() => console.log(appointmentSchedules), [appointmentSchedules]);

  // Sincronizar el formulario de edición con el veterinario seleccionado
  useEffect(() => {
    if (editModal && actualAppointmentSchedule) {
      form.setValues({
        date: new Date(actualAppointmentSchedule.date),
        hour: actualAppointmentSchedule.hour,
        maxAppointments: actualAppointmentSchedule.maxAppointments,
      });
      console.log(actualAppointmentSchedule);
    }
  }, [editModal, actualAppointmentSchedule]);

  return (
    <div>
      <Modal
        opened={createModal}
        onClose={closeCreate}
        title="Cargar maxima de turnos"
        centered
      >
        <form onSubmit={form.onSubmit(handleOnCreate)}>
          <Grid>
            <FormColumn
              inputType="date"
              name="date"
              minDate={new Date()}
              form={form}
              placeholder="Fecha"
              label="Ingrese la Fecha: "
            />
            <FormColumn
              inputType="select"
              name="hour"
              data={[
                {
                  value: '',
                  text: 'Seleccione un horario',
                  disabled: true,
                },

                { value: '8:00', text: '8:00' },
                { value: '10:00', text: '10:00' },
                { value: '12:00', text: '12:00' },
              ]}
              form={form}
              placeholder="Hora"
              label="Ingrese la Hora: "
              span={12}
            />
            <FormColumn
              inputType="text"
              name="maxAppointments"
              form={form}
              span={12}
              placeholder="Cantidad maxima de turnos"
              label="Ingrese la Cantidad maxima de turnos: "
            />
            <Grid.Col span={12}>
              <Button color={mainColor} variant="light" type="submit" fullWidth>
                Cargar Maxima de Turnos
              </Button>
            </Grid.Col>
            <Grid.Col span={12}>
              <Button color={mainColor} onClick={closeCreate} fullWidth>
                Volver
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Modal>
      <Modal
        opened={editModal}
        onClose={closeEdit}
        title="Editar Veterinario"
        centered
      >
        <form
          onSubmit={form.onSubmit((values) =>
            handleOnEdit(values as editedAppointmentSchedule)
          )}
        >
          <Grid>
            <FormColumn
              inputType="date"
              name="date"
              form={form}
              placeholder="Fecha"
              label="Ingrese la Fecha: "
            />
            <FormColumn
              inputType="select"
              name="hour"
              data={[
                {
                  value: '',
                  text: 'Seleccione un horario',
                  disabled: true,
                },

                { value: '8:00', text: '8:00' },
                { value: '10:00', text: '10:00' },
                { value: '12:00', text: '12:00' },
              ]}
              form={form}
              placeholder="Hora"
              label="Ingrese la Hora: "
            />
            <FormColumn
              inputType="text"
              name="maxAppointments"
              form={form}
              minDate={new Date()}
              placeholder="Cantidad maxima de turnos"
              label="Ingrese la Cantidad maxima de turnos: "
            />
            <Grid.Col span={6}>
              <Button color={mainColor} variant="light" type="submit" fullWidth>
                Guardar Cambios
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button color={mainColor} onClick={closeEdit} fullWidth>
                Cancelar
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Modal>
      <Modal
        opened={deleteModal}
        onClose={closeDelete}
        title="¿Seguro que desea eliminar esta maxima de turnos?"
        centered
      >
        <Flex direction="row" align="center" justify="center" gap="xl">
          <Button
            color={mainColor}
            variant="light"
            onClick={handleOnDelete}
            fullWidth
          >
            Sí, eliminar
          </Button>
          <Button color={mainColor} onClick={closeDelete} fullWidth>
            Cancelar
          </Button>
        </Flex>
      </Modal>
      <Flex gap="md" direction="column" align={'start'} justify={'center'}>
        <Title>Maxima de Turnos</Title>
        <Text>
          Definir y administrar la cantidad maxima de turnos en días y horarios
          especificos.
        </Text>

        <Box
          style={{
            width: '700px',
            border: '1px solid #ccc',
          }}
        >
          <DataTable
            value={appointmentScheduleItems}
            paginator
            rows={5}
            currentPageReportTemplate="Del {first} al {last} de {totalRecords}"
          >
            <Column
              field="date"
              header="Fecha"
              style={{ width: '22.5%' }}
              sortable
            ></Column>
            <Column
              field="hour"
              header="Hora"
              style={{ width: '22.5%' }}
              sortable
            ></Column>
            <Column
              field="maxAppointments"
              header="Maxima de Turnos"
              style={{ width: '22.5%' }}
            ></Column>

            <Column field="edit" style={{ width: '5%' }}></Column>
            <Column field="delete" style={{ width: '5%' }}></Column>
          </DataTable>
        </Box>
        <Button
          bg={mainColor}
          disabled={currentUser?.role === 'user'}
          onClick={openCreate}
        >
          Cargar Maxima de Turnos
        </Button>
      </Flex>
    </div>
  );
}
