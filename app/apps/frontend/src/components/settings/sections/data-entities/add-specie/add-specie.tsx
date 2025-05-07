import { useDisclosure } from '@mantine/hooks';
import styles from './add-specie.module.css';
import { useContext, useEffect } from 'react';
import { SettingsContext } from '../../../../../contexts/settings-context';
import useDataEntities from '../../../../../hooks/general/use-data-entities/use-data-entities';
import { UserContext } from '../../../../../contexts/user-context';
import { MainColorContext } from '../../../../../contexts/color-context';
import { ActionIcon, Box, Button, Flex, Modal, Table, Text, Title } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export function AddSpecie() {
  const [visible, { open, close }] = useDisclosure(false);
  const { specieList } = useContext(SettingsContext);
  const [species, setSpecie] = specieList;
  const { getData } = useDataEntities();
  const { currentUser } = useContext(UserContext);
  const mainColor = useContext(MainColorContext);
  const getSpecies = async () => {
    const { species } = await getData();
    if (species) {
      setSpecie(species);
    }
  };

  const NeighborhoodItems = () => {
    if (!species) return;
    return species.map((specie) => (
      <Table.Tr
        key={specie.ID_specie}
        style={{
          backgroundColor: '#f5f5f5',
        }}
      >
        <Table.Td>{specie.specie}</Table.Td>
        <Table.Td> </Table.Td>
        <Table.Td>
          <ActionIcon
            bg={mainColor}
            disabled={currentUser?.role === 'user'}
            onClick={() => {
              console.log(specie);
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
              console.log(specie);
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    ));
  };
  useEffect(() => {
    if (species !== null) return;
    getSpecies();
  }, []);
  return (
    <div>
      <Modal opened={visible} onClose={close}></Modal>
      <Flex direction={'column'} justify={'center'} align={'start'} gap={'lg'}>
        <Title>Especies</Title>
        <Text>Definir y administrar las especies que pueden ser tratadas.</Text>
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
                <Table.Td>Especie</Table.Td>
                <Table.Td> </Table.Td>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              <NeighborhoodItems />
            </Table.Tbody>
          </Table>
        </Box>
        <Button bg={mainColor} disabled={currentUser?.role === 'user'}>
          Cargar Especie
        </Button>
      </Flex>
    </div>
  );
}

export default AddSpecie;
