import { useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../../../../../contexts/settings-context';
import useDataEntities from '../../../../../hooks/general/use-data-entities/use-data-entities';
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
} from '@mantine/core';
import { MainColorContext } from '../../../../../contexts/color-context';
import { UserContext } from '../../../../../contexts/user-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDisclosure } from '@mantine/hooks';
import {
  editedNeighborhood,
  Neighborhood,
  newNeighborhood,
} from '../../../../../types/data-entities.types';
import { useForm } from '@mantine/form';
import FormColumn from '../../../../utilities/form-column/form-column';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export function AddNeighborhood() {
  const [deleteModal, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);
  const [editModal, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);
  const [createModal, { open: openCreate, close: closeCreate }] =
    useDisclosure(false);
  const form = useForm({
    initialValues: {
      neighborhood: '',
    },
    validate: {
      neighborhood: (value: string) => {
        if (!value.match(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ \s]*$/)) {
          return 'Ingreso un caracter no valido';
        }
        return null;
      },
    },
  });
  const [actualNeig, setActualNeig] = useState<Neighborhood | null>(null);
  const { neighborhoodList } = useContext(SettingsContext);
  const [neighborhoods, setNeighborhoods] = neighborhoodList;
  const { getData, editData, createNewData } = useDataEntities();
  const { currentUser } = useContext(UserContext);
  const mainColor = useContext(MainColorContext);
  const getNeighborhoods = async () => {
    const { neighborhoods } = await getData();
    if (neighborhoods) {
      setNeighborhoods(neighborhoods);
    }
  };

  const handleOnSubmitCreate = async (values: newNeighborhood) => {
    await createNewData(values, 'neighborhood');
    closeCreate();
    await getNeighborhoods();
  };
  const handleOnSubmitEdit = async (values: { neighborhood: string }) => {
    if (!actualNeig) return;
    await editNeighborhood(actualNeig.ID_neighborhood, values);
    closeEdit();
    await getNeighborhoods();
  };

  const editNeighborhood = async (
    id: number,
    editedData: editedNeighborhood
  ) => {
    await editData('neighborhood', id, editedData);
  };

  const neighborhoodItems = neighborhoods
    ?.filter((v) => v.inUse)
    .map((neighborhood) => {
      return {
        name: neighborhood.neighborhood,
        edit: (
          <ActionIcon
            color={mainColor}
            onClick={() => {
              openEdit();
              setActualNeig(neighborhood);
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
              setActualNeig(neighborhood);
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </ActionIcon>
        ),
      };
    });

  useEffect(() => {
    if (neighborhoods !== null) return;
    getNeighborhoods();
  }, []);

  useEffect(() => {
    if (createModal || editModal) return;
    form.reset();
  }, [createModal, editModal]);
  return (
    <div>
      {/* deleteModal */}
      <Modal
        opened={deleteModal}
        onClose={closeDelete}
        title="¿Seguro quieres dar de baja este barrio?"
        centered
      >
        <Flex direction={'row'} gap={'xl'} justify={'center'} align={'center'}>
          <Button
            color={mainColor}
            variant="light"
            onClick={() => {
              if (!actualNeig) return closeDelete();
              editNeighborhood(actualNeig.ID_neighborhood, { inUse: false });
              closeDelete();
            }}
            fullWidth
          >
            Si, estoy seguro
          </Button>
          <Button color={mainColor} onClick={closeDelete} fullWidth>
            Volver
          </Button>
        </Flex>
      </Modal>

      {/* editModal */}
      <Modal
        opened={editModal}
        onClose={closeEdit}
        title="¿Seguro quieres editar este barrio?"
        centered
      >
        <form onSubmit={form.onSubmit(handleOnSubmitEdit)}>
          <Grid>
            <FormColumn
              inputType="text"
              name="neighborhood"
              form={form}
              label="Nombre del Barrio"
              placeholder="Barrio"
            />
            <Grid.Col span={6}>
              <Button color={mainColor} variant="light" type="submit" fullWidth>
                Si, estoy seguro
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button color={mainColor} onClick={closeEdit} fullWidth>
                Volver
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Modal>

      {/* createModal */}
      <Modal
        opened={createModal}
        onClose={closeCreate}
        title="Nuevo Barrio"
        centered
      >
        <form onSubmit={form.onSubmit(handleOnSubmitCreate)}>
          <Grid>
            <FormColumn
              inputType="text"
              name="neighborhood"
              form={form}
              label="Ingrese nombre del Barrio: "
              placeholder="Nombre del Barrio"
            />
            <Grid.Col span={6}>
              <Button color={mainColor} variant="light" type="submit" fullWidth>
                Cargar
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button
                color={mainColor}
                onClick={() => {
                  closeCreate();
                }}
                fullWidth
              >
                Volver
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Modal>

      <Flex direction={'column'} justify={'center'} align={'start'} gap={'lg'}>
        <Title>Barrios</Title>
        <Text>Definir y administrar los barrios.</Text>

        <Box
          style={{
            border: '1px solid #ccc',
            width: '700px',
          }}
        >
          <DataTable value={neighborhoodItems} paginator rows={5}>
            <Column
              field="name"
              header="Barrio"
              style={{ width: '90%' }}
              sortable
            ></Column>
            <Column field="edit" header="" style={{ width: '5%' }}></Column>
            <Column field="delete" header="" style={{ width: '5%' }}></Column>
          </DataTable>
        </Box>
        <Button
          bg={mainColor}
          disabled={currentUser?.role === 'user'}
          onClick={openCreate}
        >
          Cargar Barrio
        </Button>
      </Flex>
    </div>
  );
}

export default AddNeighborhood;
