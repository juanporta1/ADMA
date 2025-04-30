import { Button, Flex, Modal } from '@mantine/core';
import styles from './absence-modal.module.css';
import { useContext } from 'react';
import { MainColorContext } from '../../../../../contexts/color-context';

interface props{
  absenceModal: boolean,
  closeAbsenceModal: () => void,
  handleOnSetStatus: (status: string, closeModal: () => void) => void,
}


export function AbsenceModal({absenceModal,closeAbsenceModal,handleOnSetStatus}: props) {
  const mainColor = useContext(MainColorContext)
  return (
    <Modal
        opened={absenceModal}
        onClose={closeAbsenceModal}
        title="¿El paciente se ha ausentado?(Esta acción no puede deshacerse)"
        size={'lg'}
        centered
      >
        <Flex direction={'row'} justify={'center'} align={'center'} gap={'xl'}>
          <Button
            color={mainColor}
            variant="light"
            onClick={() => handleOnSetStatus('Ausentado', closeAbsenceModal)}
          >
            Si, el paciente se ausentó
          </Button>
          <Button
            color={mainColor}
            variant="filled"
            onClick={() => closeAbsenceModal()}
          >
            Volver
          </Button>
        </Flex>
      </Modal>
  );
}

export default AbsenceModal;
