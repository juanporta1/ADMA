import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Grid,
  Modal,
  Table,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import useLogin from '../../../../../hooks/general/login/use-login';
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MainColorContext } from '../../../../../contexts/color-context';
import { UserContext } from '../../../../../contexts/user-context';
import { useDisclosure } from '@mantine/hooks';
import FormColumn from '../../../../utilities/form-column/form-column';
import { useForm } from '@mantine/form';
import { User } from '../../../../../hooks/general/login/use-login';
import { SettingsContext } from '../../../../../contexts/settings-context';
import { SelectData } from '../../../../../types/utilities.types';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export function AddUsers() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      role: '',
    },
    validate: {
      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : 'Invalid email address',
    },
  });
  const editForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      role: '',
    },
    validate: {
      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : 'Invalid email address',
    },
  });
  const [editModal, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  const mainColor = useContext(MainColorContext);
  const { getUsers, createUser, editUser } = useLogin();
  const { userList } = useContext(SettingsContext);
  const [users, setUsers] = userList;
  const { currentUser } = useContext(UserContext);
  const roleData: SelectData[] = [
    { value: '', text: 'Seleccione un Rol', disabled: true },
    {
      value: 'admin',
      text: 'Administrador',
      disabled: currentUser?.role !== 'main',
    },
    { value: 'user', text: 'Usuario' },
  ];
  const [visible, { open, close }] = useDisclosure(false);
  const [deleteModal, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);
  const [actualUser, setActualUser] = useState<User | null>(null);
  const usersItems = users
    ?.filter((v) => v.inUse)
    .map((u) => {
      return {
        email: u.email,
        role: u.role,
        edit: (
          <ActionIcon
            color={mainColor}
            onClick={() => {
              setActualUser(u);
              openEditModal();
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </ActionIcon>
        ),
        delete: (
          <ActionIcon
            color={mainColor}
            onClick={() => {
              setActualUser(u);
              openDeleteModal();
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </ActionIcon>
        ),
      };
    });
  const handleOnCreateUser = async (values: {
    email: string;
    role: string;
  }) => {
    try {
      const newUser = await createUser(
        values.email,
        values.role as 'main' | 'admin' | 'user'
      );
      setUsers(await getUsers());
      close();
      form.reset();
    } catch (err) {
      console.log(err);
      close();
    }
  };
  const handleOnEditUser = async (values: { email: string; role: string }) => {
    if (actualUser)
      await editUser({
        ID_user: actualUser.ID_user,
        email: values.email,
        role: values.role as 'main' | 'admin' | 'user',
        inUse: actualUser.inUse,
      });
    setUsers(await getUsers());
    closeEditModal();
  };

  const handleOnDelete = async () => {
    if (actualUser)
      await editUser({
        ID_user: actualUser.ID_user,
        email: actualUser.email,
        inUse: false,
        role: actualUser.role,
      });
  };
  const getUsersList = async () => {
    const users = await getUsers();
    setUsers(users);
  };
  useEffect(() => {
    if (users) return;
    getUsersList();
  }, []);
  return (
    <div>
      {/*Modal de eliminacion*/}
      <Modal
        centered
        opened={deleteModal}
        onClose={closeDeleteModal}
        title="¿Seguro quiere eliminar este usuario?(Esta acción no puede deshacerse)"
      >
        <Flex
          direction={'row'}
          justify={'center'}
          align="center"
          pt={'10px'}
          gap={'md'}
        >
          <Button
            variant="light"
            color={mainColor}
            onClick={async () => {
              console.log(actualUser, 'actualUser');
              if (actualUser) await handleOnDelete();
              closeDeleteModal();
              setUsers(await getUsers());
            }}
            fullWidth
          >
            Sí, estoy seguro
          </Button>
          <Button color={mainColor} onClick={closeDeleteModal} fullWidth>
            Cancelar
          </Button>
        </Flex>
      </Modal>

      {/*Modal de edicion*/}
      <Modal
        centered
        opened={editModal}
        onClose={closeEditModal}
        title="Cargar Usuario"
      >
        <form onSubmit={editForm.onSubmit(handleOnEditUser)}>
          <Grid>
            <FormColumn
              form={editForm}
              inputType="text"
              name="email"
              label="Ingrese Email: "
              placeholder="ejemplo@gmail.com"
              span={12}
            />
            <FormColumn
              form={editForm}
              inputType="select"
              name="role"
              label="Ingrese Rol: "
              data={roleData}
              span={12}
            />
            <Grid.Col span={6}>
              <Button color={mainColor} variant="light" type="submit" fullWidth>
                Editar Usuario
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button bg={mainColor} onClick={closeEditModal} fullWidth>
                Volver
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Modal>
      {/*modal de creacion */}
      <Modal opened={visible} onClose={close} title="Cargar Usuario">
        <form onSubmit={form.onSubmit(handleOnCreateUser)}>
          <Grid>
            <FormColumn
              form={form}
              inputType="text"
              name="email"
              label="Ingrese Email: "
              placeholder="ejemplo@gmail.com"
              span={12}
            />
            <FormColumn
              form={form}
              inputType="select"
              name="role"
              label="Ingrese Rol: "
              data={roleData}
              span={12}
            />
            <Grid.Col span={12}>
              <Button
                bg={mainColor}
                type="submit"
                disabled={currentUser?.role === 'user'}
              >
                Cargar Usuario
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Modal>

      <Flex direction={'column'} justify={'center'} align={'start'} gap={'lg'}>
        <Title>Usuarios</Title>
        <Text>Definir y administrar los usuarios y sus roles.</Text>

        <Box
          style={{
            width: '700px',
            border: '1px solid #ccc',
          }}
        >
          <DataTable value={usersItems} paginator rows={5}>
            <Column
              field="email"
              header="Email"
              style={{ width: '45%' }}
            ></Column>
            <Column field="role" header="Rol" style={{ width: '45%' }}></Column>
            <Column field="edit" style={{ width: '5%' }}></Column>
            <Column field="delete" style={{ width: '5%' }}></Column>
          </DataTable>
        </Box>
        <Button
          bg={mainColor}
          disabled={currentUser?.role === 'user'}
          onClick={open}
        >
          Cargar Usuario
        </Button>
      </Flex>
    </div>
  );
}

export default AddUsers;
