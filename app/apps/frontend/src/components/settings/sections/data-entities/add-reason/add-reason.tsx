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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import useDataEntities from '../../../../../hooks/general/use-data-entities/use-data-entities';
import { UserContext } from '../../../../../contexts/user-context';
import { useContext, useEffect, useState } from 'react';
import { MainColorContext } from '../../../../../contexts/color-context';
import { SettingsContext } from '../../../../../contexts/settings-context';
import { useDisclosure } from '@mantine/hooks';
import { Reason } from '../../../../../types/data-entities.types';
import FormColumn from '../../../../utilities/form-column/form-column';
import { useForm } from '@mantine/form';
import { SelectData } from '../../../../../types/utilities.types';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

export function AddReason() {
  const [deleteModal, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);
  const [createModal, { open: openCreate, close: closeCreate }] =
    useDisclosure(false);
  const [editModal, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);
  const form = useForm({
    initialValues: {
      reason: '',
      reasonSex: '',
    },
    validate: {
      reason: (value) => {
        if (!/^[a-záéíóúñüA-ZÁÉÍÓÚÑÜ \s]+$/.test(value)) {
          return 'Has ingresado un caracter no permitido';
        }
        return null;
      },
    },
  });
  const selectData: SelectData[] = [
    { value: '', text: 'Seleccione una opción', disabled: true },
    { value: 'a', text: 'Ambos' },
    { value: 'm', text: 'Macho' },
    { value: 'h', text: 'Hembra' },
  ];
  const { reasonList } = useContext(SettingsContext);
  const [reasons, setReasons] = reasonList;
  const { getData, editData, createNewData } = useDataEntities();
  const { currentUser } = useContext(UserContext);
  const mainColor = useContext(MainColorContext);
  const [actualReason, setActualReason] = useState<Reason | null>(null);
  const getReasons = async () => {
    const { reasons } = await getData();
    if (reasons) {
      setReasons(reasons);
    }
  };

  const handleOnCreate = async (values: {
    reason: string;
    reasonSex: string;
  }) => {
    await createNewData(
      { reason: values.reason, reasonSex: values.reasonSex as 'a' | 'm' | 'h' },
      'reason'
    );
    closeCreate();
    await getReasons();
  };

  const handleOnEdit = async (values: {
    reason: string;
    reasonSex: string;
  }) => {
    if (!actualReason) return;
    await editData('reason', actualReason.ID_reason, {
      reason: values.reason,
      reasonSex: values.reasonSex as 'a' | 'm' | 'h',
    });
    closeEdit();
    await getReasons();
  };

  const handleOnDelete = async () => {
    if (!actualReason) return;
    await editData('reason', actualReason.ID_reason, { inUse: false });
    closeDelete();
    await getReasons();
  };

  const ReasonItems = () => {
    if (!reasons) return;

    return reasons.map((reason, i) => {
      if (!reason.inUse) return;
      let disabled = false;
      if (reason.reason === 'Otro') disabled = true;
      let sexLabel = 'Ambos';
      if (reason.reasonSex === 'm') sexLabel = 'Macho';
      if (reason.reasonSex === 'h') sexLabel = 'Hembra';
      return (
        <Table.Tr
          key={reason.ID_reason}
          style={{
            backgroundColor: '#f5f5f5',
          }}
        >
          <Table.Td>{reason.reason}</Table.Td>
          <Table.Td>{sexLabel}</Table.Td>
          <Table.Td w={'50px'}>
            <ActionIcon
              bg={mainColor}
              disabled={currentUser?.role === 'user' || disabled}
              onClick={() => {
                setActualReason(reason);
                openEdit();
                form.setValues({
                  reason: reason.reason,
                  reasonSex: reason.reasonSex,
                });
              }}
            >
              <FontAwesomeIcon icon={faEdit} />
            </ActionIcon>
          </Table.Td>
          <Table.Td w={'50px'}>
            <ActionIcon
              bg={mainColor}
              disabled={currentUser?.role === 'user' || disabled}
              onClick={() => {
                setActualReason(reason);
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
    if (reasons !== null) return;
    getReasons();
  }, []);

  useEffect(() => {
    if (createModal || editModal) return;
    form.reset();
  }, [editModal, createModal]);
  return (
    <div>
      {/*Delete Modal*/}
      <Modal
        opened={deleteModal}
        onClose={closeDelete}
        title="¿Seguro quiere dar de baja esta razón?"
        centered
      >
        <Flex direction={'row'} align={'center'} justify={'center'} gap={'xl'}>
          <Button
            color={mainColor}
            variant="light"
            onClick={handleOnDelete}
            fullWidth
          >
            Si, estoy seguro
          </Button>
          <Button color={mainColor} onClick={closeDelete} fullWidth>
            Volver
          </Button>
        </Flex>
      </Modal>

      {/* Edit Modal */}
      <Modal
        opened={editModal}
        onClose={closeEdit}
        title="¿Seguro quiere editar esta razón?"
        centered
      >
        <form onSubmit={form.onSubmit(handleOnEdit)}>
          <Grid>
            <FormColumn
              inputType="text"
              form={form}
              name="reason"
              label="Razón: "
              placeholder="Razón"
            />
            <FormColumn
              inputType="select"
              form={form}
              name="reasonSex"
              label="Para que sexo es la razón: "
              data={selectData}
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

      {/* Create Modal */}
      <Modal
        opened={createModal}
        onClose={closeCreate}
        title="Nueva Razón"
        centered
      >
        <form onSubmit={form.onSubmit(handleOnCreate)}>
          <Grid>
            <FormColumn
              inputType="text"
              form={form}
              name="reason"
              label="Razón: "
              placeholder="Razón"
            />
            <FormColumn
              inputType="select"
              form={form}
              name="reasonSex"
              label="Para que sexo es la razón: "
              data={selectData}
            />
            <Grid.Col span={6}>
              <Button color={mainColor} variant="light" type="submit" fullWidth>
                Cargar
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

      <Flex direction={'column'} justify={'center'} align={'start'} gap={'lg'}>
        <Title>Razones</Title>
        <Text>
          Definir y administrar las razones de los turnos cancelados y no
          realizados.
        </Text>

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
                <Table.Th>Razón</Table.Th>
                <Table.Th>Sexo</Table.Th>
              </Table.Tr>
            </Table.Thead>
          </Table>
          <SimpleBar style={{ maxHeight: 200 }}>
            <Table>
              <Table.Thead display={'none'}>
                <Table.Tr>
                  <Table.Td>Razón</Table.Td>
                  <Table.Td>Sexo</Table.Td>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <ReasonItems />
              </Table.Tbody>
            </Table>
          </SimpleBar>
        </Box>

        <Button
          bg={mainColor}
          disabled={currentUser?.role === 'user'}
          onClick={() => {
            openCreate();
          }}
        >
          Cargar Razón
        </Button>
      </Flex>
    </div>
  );
}

export default AddReason;
