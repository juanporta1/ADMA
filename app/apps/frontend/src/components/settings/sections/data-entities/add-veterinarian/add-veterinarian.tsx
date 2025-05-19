import { useContext, useEffect, useState } from 'react';
import useDataEntities from '../../../../../hooks/general/use-data-entities/use-data-entities';
import styles from './add-veterinarian.module.css';
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
  Table,
  Text,
  Title,
} from '@mantine/core';
import { MainColorContext } from '../../../../../contexts/color-context';
import { UserContext } from '../../../../../contexts/user-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DataTable, DataTableValue } from 'primereact/datatable';
import { Column } from 'primereact/column';

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
    await getVeterinarians();
  };

  const handleOnEdit = async (values: editedVeterinarian) => {
    if (!actualVeterinarian) return;
    await editData('veterinarian', actualVeterinarian.ID_veterinarian, values);
    await getVeterinarians();
  };

  const handleOnDelete = async () => {
    if (!actualVeterinarian) return;
    await editData('veterinarian', actualVeterinarian.ID_veterinarian, {
      inUse: false,
    });
    await getVeterinarians();
  };

  const veterinarianItems = veterinarians
    .filter((v) => v.inUse)
    .map((v) => ({
      name: v.name,
      lastName: v.lastName,
      phone: v.phone || 'Sin teléfono',
      email: v.email || 'Sin email',
    }));

  useEffect(() => {
    getVeterinarians();
  }, []);

  useEffect(() => {
    if (editModal || createModal) form.reset();
  }, [editModal, createModal]);

  useEffect(() => console.log(veterinarians), [veterinarians]);

  return (
    <div>
      <Flex gap="md" direction="column" align={'start'} justify={'center'}>
        <Title>Veterinarios</Title>
        <Text>Definir y administrar a los veterinarios.</Text>

        <Box
          style={{
            width: '600px',
          }}
        >
          <DataTable
            value={veterinarianItems}
            paginator
            rows={5}
            currentPageReportTemplate="Del {first} al {last} de {totalRecords}"
          >
            <Column
              field="name"
              header="Nombre"
              style={{ width: '25%' }}
            ></Column>
            <Column
              field="lastName"
              header="Apellido"
              style={{ width: '25%' }}
            ></Column>
            <Column
              field="phone"
              header="Teléfono"
              style={{ width: '25%' }}
            ></Column>
            <Column
              field="email"
              header="Email"
              style={{ width: '25%' }}
            ></Column>
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
