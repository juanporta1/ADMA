import { useContext, useEffect } from 'react';
import styles from './add-neighborhood.module.css';
import { SettingsContext } from '../../../../../contexts/settings-context';
import useDataEntities from '../../../../../hooks/general/use-data-entities/use-data-entities';
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Modal,
  Table,
  Text,
  Title,
} from '@mantine/core';
import { MainColorContext } from '../../../../../contexts/color-context';
import { UserContext } from '../../../../../contexts/user-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDisclosure } from '@mantine/hooks';

export function AddNeighborhood() {
  const [visible, { open, close }] = useDisclosure(false);
  const { neighborhoodList } = useContext(SettingsContext);
  const [neighborhoods, setNeighborhoods] = neighborhoodList;
  const { getData } = useDataEntities();
  const { currentUser } = useContext(UserContext);
  const mainColor = useContext(MainColorContext);
  const getNeighborhoods = async () => {
    const { neighborhoods } = await getData();
    if (neighborhoods) {
      setNeighborhoods(neighborhoods);
    }
  };

  const NeighborhoodItems = () => {
    if (!neighborhoods) return;
    return neighborhoods.map((neighborhood) => (
      <Table.Tr
        key={neighborhood.ID_neighborhood}
        style={{
          backgroundColor: '#f5f5f5',
        }}
      >
        <Table.Td>{neighborhood.neighborhood}</Table.Td>
        <Table.Td> </Table.Td>
        <Table.Td>
          <ActionIcon
            bg={mainColor}
            disabled={currentUser?.role === 'user'}
            onClick={() => {
              console.log(neighborhood);
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
              console.log(neighborhood);
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    ));
  };
  useEffect(() => {
    if (neighborhoods !== null) return;
    getNeighborhoods();
  }, []);
  return (
    <div>
      <Modal opened={visible} onClose={close}></Modal>
      <Flex direction={'column'} justify={'center'} align={'start'} gap={'lg'}>
        <Title>Barrios</Title>
        <Text>Definir y administrar los barrios.</Text>
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
                <Table.Td>Barrio</Table.Td>
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

export default AddNeighborhood;
