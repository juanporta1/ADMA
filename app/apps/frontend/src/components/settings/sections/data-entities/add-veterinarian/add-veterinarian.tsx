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
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

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

  const VeterinarianItems = () => {
    if (!veterinarians) return;

    return veterinarians.map((v) => {
      if (!v.inUse) return;
      return (
        <Table.Tr
          key={v.ID_veterinarian}
          style={{ backgroundColor: '#f5f5f5' }}
          onClick={() => {
            setActualVeterinarian(v);
            openEdit();
          }}
        >
          <Table.Td>{v.lastName}</Table.Td>
          <Table.Td>{v.name}</Table.Td>
          <Table.Td>{v.phone || <Text c="#aaaa">Sin Teléfono</Text>}</Table.Td>
          <Table.Td>{v.email || <Text c="#aaaa">Sin Mail</Text>}</Table.Td>
          <Table.Td style={{ width: '50px' }}>
            <ActionIcon
              color={mainColor}
              onClick={(e) => {
                setActualVeterinarian(v);
                openEdit();
              }}
            >
              <FontAwesomeIcon icon={faEdit} />
            </ActionIcon>
          </Table.Td>
          <Table.Td style={{ width: '50px' }}>
            <ActionIcon
              color={mainColor}
              onClick={(e) => {
                setActualVeterinarian(v);
                openDelete();
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </ActionIcon>
          </Table.Td>
        </Table.Tr>
      );
    });
  };

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
            maxHeight: '300px',

            border: '1px solid #e8e8e8',
            width: '500px',
          }}
        >
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Apellido</Table.Th>
                <Table.Th>Nombre</Table.Th>
                <Table.Th>Teléfono</Table.Th>
                <Table.Th>Mail</Table.Th>
                <Table.Td> </Table.Td>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody display={'none'}>
              <VeterinarianItems />
            </Table.Tbody>
          </Table>
          <SimpleBar style={{ maxHeight: 200 }}>
            <Table>
              <Table.Thead display={'none'}>
                <Table.Tr>
                  <Table.Th>Apellido</Table.Th>
                  <Table.Th>Nombre</Table.Th>
                  <Table.Th>Teléfono</Table.Th>
                  <Table.Th>Mail</Table.Th>
                  <Table.Td> </Table.Td>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <VeterinarianItems />
              </Table.Tbody>
            </Table>
          </SimpleBar>
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
