import { Box, Button, Flex, Table, Text, Title } from '@mantine/core';
import styles from './add-users.module.css';
import useLogin from '../../../../hooks/general/login/use-login';
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MainColorContext } from '../../../../contexts/color-context';

interface porps {
  id: string;
}
export function AddUsers(props: porps) {
  const mainColor = useContext(MainColorContext);
  const { getUsers } = useLogin();
  const [users, setUsers] = useState<
    { ID_user: number; email: string; role: 'admin' | 'main' | 'user' }[]
  >([]);

  const UsersItems = () =>
    users.map((user) => {
      return (
        <Table.Tr
          key={user.ID_user}
          style={{
            backgroundColor: '#f5f5f5',
          }}
        >
          <Table.Td>{user.email}</Table.Td>
          <Table.Td>{user.role}</Table.Td>
          <Table.Td>
            <Button bg={mainColor}>
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          </Table.Td>
          <Table.Td>
            <Button bg={mainColor}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </Table.Td>
        </Table.Tr>
      );
    });

  const getUsersList = async () => {
    const users = await getUsers();
    setUsers(users);
  };
  useEffect(() => {
    getUsersList();
  }, []);
  return (
    <Flex
      id={props.id}
      direction={'column'}
      justify={'center'}
      align={'start'}
      gap={'lg'}
    >
      <Title>Usuarios</Title>
      <Text>Definir y administrar los usuarios y sus roles.</Text>
      <Table
        style={{
          border: '1px solid #e8e8e8',
          width: '500px',
          maxHeight: '200px',
        }}
      >
        <Table.Thead style={{}}>
          <Table.Th>Email</Table.Th>
          <Table.Th>Rol</Table.Th>
        </Table.Thead>
        <Table.Tbody>
          <UsersItems />
        </Table.Tbody>
      </Table>
    </Flex>
  );
}

export default AddUsers;
