import { Button, Flex, Grid, Modal } from '@mantine/core';
import styles from './canceled-modal.module.css';
import { useContext, useEffect, useState } from 'react';
import { MainColorContext } from '../../../../../contexts/color-context';
import FormColumn from '../../../../utilities/form-column/form-column';
import { useForm } from '@mantine/form';
import {
  SelectData,
  useSelectsData,
} from '../../../../../hooks/appointment/use-selects-data/use-selects-data';
import { Appointment } from '../../../appointment/filter/filter-appointments';

interface props {
  cancelModal: boolean;
  closeCancelModal: () => void;
  handleOnSetStatus: (
    status: string,
    closeFunction: () => void,
    observations?: string,
    reason?: string
  ) => void;
  actualAppointement: Appointment | null;
}

export function CanceledModal({
  cancelModal,
  closeCancelModal,
  handleOnSetStatus,
  actualAppointement,
}: props) {
  console.log(actualAppointement, 'desde canceled modal');
  const mainColor = useContext(MainColorContext);
  const form = useForm({
    mode: 'controlled',
    initialValues: {
      reason: '',
      observations: '',
    },
  });

  const [reasons, setReasons] = useState<SelectData[]>([]);

  const { getSelectData } = useSelectsData();
  const handleOnSubmit = (v: typeof form.values) => {
    handleOnSetStatus('Cancelado', closeCancelModal, v.observations, v.reason);
  };
  useEffect(() => {
    const fetchSelectsData = async () => {
      if (!actualAppointement) return;
      const { reason } = await getSelectData(actualAppointement);
      setReasons(reason);
    };
    fetchSelectsData();
    form.setValues({ observations: actualAppointement?.observations || '' });
  }, [actualAppointement]);
  useEffect(() => console.log(reasons), [reasons]);

  return (
    <Modal
      opened={cancelModal}
      onClose={closeCancelModal}
      title="¿El turno ha sido cancelado?(Esta acción no puede deshacerse)"
      size={'lg'}
      centered
    >
      <form onSubmit={form.onSubmit(handleOnSubmit)}>
        <Flex
          direction={'row'}
          justify={'center'}
          align={'center'}
          gap={'xl'}
          mb={'md'}
        >
          <Grid>
            <FormColumn
              inputType="select"
              form={form}
              name="reason"
              label="Razón del Cancelamiento"
              data={reasons}
              span={12}
            />
            <FormColumn
              inputType="textarea"
              form={form}
              name="observations"
              label="Observaciones"
              placeholder="Observaciones"
              notRequired
            />
          </Grid>
        </Flex>
        <Flex direction={'row'} justify={'center'} align={'center'} gap={'xl'}>
          <Button color={mainColor} variant="light" type="submit">
            Si, el paciente ha cancelado el turno
          </Button>
          <Button
            color={mainColor}
            variant="filled"
            onClick={() => closeCancelModal()}
          >
            Volver
          </Button>
        </Flex>
      </form>
    </Modal>
  );
}

export default CanceledModal;
