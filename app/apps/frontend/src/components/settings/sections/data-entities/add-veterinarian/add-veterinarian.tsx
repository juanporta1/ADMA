import { useContext, useEffect, useState } from 'react';
import useDataEntities from '../../../../../hooks/general/use-data-entities/use-data-entities';
import {
  editedVeterinarian,
  newVeterinarian,
  Veterinarian,
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

export function AddVeterinarian() {
  //Form
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      lastName: '',
      phone: '',
      email: '',
    },
    validate: {
      name: (value) =>
        /^[A-Za-zÁÉÍÓÚáéíóúÑñ \s]+$/.test(value)
          ? null
          : 'El nombre solo puede contener letras y espacios',
      lastName: (value) =>
        /^[A-Za-zÁÉÍÓÚáéíóúÑñ \s]+$/.test(value)
          ? null
          : 'El apellido solo puede contener letras y espacios',
      email: (value) =>
        !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? null
          : 'Correo electrónico inválido',
      phone: (value) =>
        !value || /^[0-9]+$/.test(value)
          ? null
          : 'El teléfono solo puede contener números',
    },
  });

  //Contexts
  const mainColor = useContext(MainColorContext);
  const { currentUser } = useContext(UserContext);
  //States
  const [veterinarians, setVeterinarians] = useState<Veterinarian[]>([]);
  const [actualVeterinarian, setActualVeterinarian] =
    useState<Veterinarian | null>(null);
  const { getData, createNewData, editData } = useDataEntities();

  //Disclosures
  const [deleteModal, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);
  const [editModal, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);
  const [createModal, { open: openCreate, close: closeCreate }] =
    useDisclosure(false);

  //Functions
  const getVeterinarians = async () => {
    const { veterinarians } = await getData();
    if (veterinarians) {
      setVeterinarians(veterinarians);
    }
  };
  const handleOnCreate = async (values: newVeterinarian) => {
    await createNewData(values, 'veterinarian');
    closeCreate();
    await getVeterinarians();
  };

  const handleOnEdit = async (values: editedVeterinarian) => {
    if (!actualVeterinarian) return;
    console.log('actualVeterinarian', actualVeterinarian);
    await editData('veterinarian', actualVeterinarian.ID_veterinarian, values);

    await getVeterinarians();
    closeEdit();
  };

  const handleOnDelete = async () => {
    if (!actualVeterinarian) return;

    await editData('veterinarian', actualVeterinarian.ID_veterinarian, {
      inUse: false,
    });
    await getVeterinarians();
    closeDelete();
  };

  const veterinarianItems = veterinarians
    .filter((v) => v.inUse)
    .map((v) => ({
      name: v.name,
      lastName: v.lastName,
      phone: v.phone || 'Sin teléfono',
      email: v.email || 'Sin email',
      edit: (
        <ActionIcon
          color={mainColor}
          onClick={() => {
            openEdit();
            setActualVeterinarian(v);
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
            setActualVeterinarian(v);
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </ActionIcon>
      ),
    }));

  useEffect(() => {
    getVeterinarians();
  }, []);

  useEffect(() => {
    if (editModal || createModal) form.reset();
  }, [editModal, createModal]);

  // Sincronizar el formulario de edición con el veterinario seleccionado
  useEffect(() => {
    if (editModal && actualVeterinarian) {
      form.setValues({
        name: actualVeterinarian.name || '',
        lastName: actualVeterinarian.lastName || '',
        phone: actualVeterinarian.phone || '',
        email: actualVeterinarian.email || '',
      });
    }
  }, [editModal, actualVeterinarian]);

  return (
    <div>
      <Modal
        opened={createModal}
        onClose={closeCreate}
        title="Cargar Veterinario"
        centered
      >
        <form onSubmit={form.onSubmit(handleOnCreate)}>
          <Grid>
            <FormColumn
              form={form}
              name="lastName"
              inputType="text"
              label="Apellido"
              placeholder="Ingrese el Apellido"
              span={6}
            />
            <FormColumn
              form={form}
              name="name"
              inputType="text"
              label="Nombre"
              placeholder="Ingrese el Nombre"
              span={6}
            />
            <FormColumn
              form={form}
              name="phone"
              inputType="text"
              label="Teléfono"
              placeholder="Ingrese el Teléfono"
              span={6}
              notRequired
            />
            <FormColumn
              form={form}
              name="email"
              inputType="text"
              label="Email"
              placeholder="Ingrese el Email"
              span={6}
              notRequired
            />
            <Grid.Col span={6}>
              <Button color={mainColor} variant="light" type="submit" fullWidth>
                Cargar Veterinario
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
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
            handleOnEdit(values as editedVeterinarian)
          )}
        >
          <Grid>
            <FormColumn
              form={form}
              name="lastName"
              inputType="text"
              label="Apellido"
              placeholder="Ingrese el Apellido"
              span={6}
            />
            <FormColumn
              form={form}
              name="name"
              inputType="text"
              label="Nombre"
              placeholder="Ingrese el Nombre"
              span={6}
            />
            <FormColumn
              form={form}
              name="phone"
              inputType="text"
              label="Teléfono"
              placeholder="Ingrese el Teléfono"
              span={6}
              notRequired
            />
            <FormColumn
              form={form}
              name="email"
              inputType="text"
              label="Email"
              placeholder="Ingrese el Email"
              span={6}
              notRequired
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
        title="¿Seguro que desea eliminar este veterinario?"
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
        <Title>Veterinarios</Title>
        <Text>Definir y administrar a los veterinarios.</Text>

        <Box
          style={{
            width: '700px',
            border: '1px solid #ccc',
          }}
        >
          <DataTable
            value={veterinarianItems}
            paginator
            rows={5}
            currentPageReportTemplate="Del {first} al {last} de {totalRecords}"
          >
            <Column
              field="lastName"
              header="Apellido"
              style={{ width: '22.5%' }}
              sortable
            ></Column>
            <Column
              field="name"
              header="Nombre"
              style={{ width: '22.5%' }}
              sortable
            ></Column>
            <Column
              field="phone"
              header="Teléfono"
              style={{ width: '22.5%' }}
            ></Column>
            <Column
              field="email"
              header="Email"
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
          Cargar Veterinario
        </Button>
      </Flex>
    </div>
  );
}

export default AddVeterinarian;
