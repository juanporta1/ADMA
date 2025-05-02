import { Button, Flex, Grid, Modal } from '@mantine/core';
import styles from './not-done-modal.module.css';
import { Appointment } from '../../../appointment/filter/filter-appointments';
import FormColumn from '../../../../utilities/form-column/form-column';
import { useContext, useEffect, useState } from 'react';
import { MainColorContext } from '../../../../../contexts/color-context';
import useSelectsData, {
  SelectData,
} from '../../../../../hooks/appointment/use-selects-data/use-selects-data';
import { useForm } from '@mantine/form';

interface props {
  notDoneModal: boolean;
  closeNotDoneModal: () => void;
  handleOnSetStatus: (
    status: string,
    closeFunction: () => void,
    observations?: string,
    reason?: string
  ) => void;
  actualAppointement: Appointment | null;
  fetch: () => void;
}

export function NotDoneModal({
  notDoneModal,
  closeNotDoneModal,
  handleOnSetStatus,
  actualAppointement,
  fetch,
}: props) {
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
    handleOnSetStatus(
      'No Realizado',
      closeNotDoneModal,
      v.observations,
      v.reason
    );
    fetch();
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
  return (
    <Modal
      opened={notDoneModal}
      onClose={closeNotDoneModal}
      centered
      title="¿La castración no fue realizada?"
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
            Si, la castración no ha sido realizada
          </Button>
          <Button
            color={mainColor}
            variant="filled"
            onClick={() => closeNotDoneModal()}
          >
            Volver
          </Button>
        </Flex>
      </form>
    </Modal>
  );
}

export default NotDoneModal;
