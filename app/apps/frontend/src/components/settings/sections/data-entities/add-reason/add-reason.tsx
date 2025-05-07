import { ActionIcon, Box, Button, Flex, Modal, Table, Text, Title } from '@mantine/core';
import styles from './add-reason.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import useDataEntities from '../../../../../hooks/general/use-data-entities/use-data-entities';
import { UserContext } from '../../../../../contexts/user-context';
import { useContext, useEffect } from 'react';
import { MainColorContext } from '../../../../../contexts/color-context';
import { SettingsContext } from '../../../../../contexts/settings-context';
import { useDisclosure } from '@mantine/hooks';

export function AddReason() {
  const [visible, { open, close }] = useDisclosure(false);
  const { reasonList } = useContext(SettingsContext);
  const [reasons, setReasons] = reasonList;
  const { getData } = useDataEntities();
  const { currentUser } = useContext(UserContext);
  const mainColor = useContext(MainColorContext);
  const getReasons = async () => {
    const { reasons } = await getData();
    if (reasons) {
      setReasons(reasons);
    }
  };

  const NeighborhoodItems = () => {
    if (!reasons) return;
    return reasons.map((reason) => (
      <Table.Tr
        key={reason.ID_reason}
        style={{
          backgroundColor: '#f5f5f5',
        }}
      >
        <Table.Td>{reason.reason}</Table.Td>
        <Table.Td> </Table.Td>
        <Table.Td>
          <ActionIcon
            bg={mainColor}
            disabled={currentUser?.role === 'user'}
            onClick={() => {
              console.log(reason);
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </ActionIcon>
        </Table.Td>
        <Table.Td>
          <ActionIcon
            bg={mainColor}
            disabled={currentUser?.role === 'user'}
            onClick={() => {
              console.log(reason);
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    ));
  };
  useEffect(() => {
    if (reasons !== null) return;
    getReasons();
  }, []);
  return (
    <div>
      <Modal opened={visible} onClose={close}></Modal>
      <Flex direction={'column'} justify={'center'} align={'start'} gap={'lg'}>
        <Title>Razones</Title>
        <Text>Definir y administrar las razones de los turnos cancelados y no realizados.</Text>
        <Box
          style={{
            maxHeight: '300px',
            overflow: 'auto',
            border: '1px solid #e8e8e8',
            width: '500px',
          }}
        >
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Td>Razón</Table.Td>
                <Table.Td> </Table.Td>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              <NeighborhoodItems />
            </Table.Tbody>
          </Table>
        </Box>
        <Button bg={mainColor} disabled={currentUser?.role === 'user'}>
          Cargar Razón
        </Button>
      </Flex>
    </div>
  );
}

export default AddReason;
