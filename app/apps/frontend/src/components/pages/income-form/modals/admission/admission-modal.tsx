import { Button, Grid, Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Appointment } from '../../../appointment/filter/filter-appointments';
import FormColumn from '../../../../utilities/form-column/form-column';
import { useContext } from 'react';
import { MainColorContext } from '../../../../../contexts/color-context';
import useIncomeForm from '../../../../../hooks/income-form/use-income-form/use-income-form';

interface props {
  admissionModal: boolean;
  closeAdmissionModal: () => void;
  actualAppointment: Appointment | null;
}

export function AdmissionModal({
  admissionModal,
  closeAdmissionModal,
  actualAppointment,
}: props) {
  const mainColor = useContext(MainColorContext);
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      age: '',
      weight: '',
      animalName: '',
      features: '',
    },
    validate: {
      animalName: (value: string) =>
        /^[a-zA-ZÀ-ÿ\s]*$/.test(value)
          ? null
          : 'Has ingresado un caracter no válido.',
      weight: (value: string) =>
        /^[0-9.,]*$/.test(value)
          ? null
          : 'Solo puedes ingresar numeros, coma o punto.',
    },
  });
  const { create } = useIncomeForm();
  const handleOnSubmit = async (v: typeof form.values) => {
    if (!actualAppointment) return;
    const newIncome = create({
      ID_appointment: actualAppointment.ID_appointment,
      age: v.age,
      animalName: v.animalName,
      features: v.features,
      weight: v.weight
    });
    console.log(newIncome)
  };
  return (
    <Modal
      opened={admissionModal}
      onClose={closeAdmissionModal}
      title="¿Esta el paciente listo para comenzar el proceso de castracion? (Esta información podrás editarla luego)"
      size={'lg'}
      centered
    >
      <form onSubmit={form.onSubmit(handleOnSubmit)}>
        <Grid>
          <FormColumn
            inputType="text"
            form={form}
            name="animalName"
            label="Nombre del Paciente:"
            placeholder="Ingrese nombre del animal"
            span={12}
          />
          <FormColumn
            inputType="text"
            form={form}
            name="weight"
            label="Ingrese peso del animal(En KG): "
            placeholder="Peso del animal"
            span={12}
          />
          <FormColumn
            inputType="text"
            form={form}
            name="age"
            label="Ingrese Edad del animal y en que escala(Meses, Años, etc): "
            placeholder="Edad del animal(ej: 4años, 10 meses)"
            span={12}
          />
          <FormColumn
            inputType="textarea"
            form={form}
            name="features"
            label="Ingrese Caractersiticas del animal: "
            placeholder="Caracteristicas del animal"
            span={12}
          />
          <Grid.Col span={12}>
            <Button color={mainColor} variant="light" type="submit" fullWidth>
              Si, esta listo
            </Button>
          </Grid.Col>
          <Grid.Col span={12}>
            <Button color={mainColor} variant="filled" fullWidth>
              Volver
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </Modal>
  );
}

export default AdmissionModal;
