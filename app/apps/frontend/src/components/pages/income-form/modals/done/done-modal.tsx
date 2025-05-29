import { Button, Grid, Modal } from '@mantine/core';
import { Appointment } from '../../../../../types/entities.types';
import FormColumn from '../../../../utilities/form-column/form-column';
import useAppointment from '../../../../../hooks/appointment/use-appointment/use-appointment';
import useIncomeForm from '../../../../../hooks/income-form/use-income-form/use-income-form';
import { useForm } from '@mantine/form';
import { MainColorContext } from '../../../../../contexts/color-context';
import { useContext, useEffect } from 'react';
import { SelectData } from '../../../../../types/utilities.types';
interface props {
  doneModal: boolean;
  closeDoneModal: () => void;
  actualAppointment: Appointment | null;
  fetch: () => void;
  veterinarians: SelectData[];
  actualVeterinarian: string;
}
export function DoneModal({
  actualAppointment,
  closeDoneModal,
  doneModal,
  fetch,
  veterinarians,
  actualVeterinarian,
}: props) {
  const mainColor = useContext(MainColorContext);
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      veterinarian: actualVeterinarian,
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
        /^\d+([.,]\d+)?$/.test(value)
          ? null
          : 'Solo puedes ingresar números y una única coma o punto decimal.',
    },
  });

  const { createCastration } = useIncomeForm();
  const { editStatus } = useAppointment();
  const handleOnSubmit = async (v: typeof form.values) => {
    console.log(v);
    if (!actualAppointment) return;
    if (!actualAppointment.incomeForm) return;
    await editStatus(actualAppointment.ID_appointment, 'Realizado');
    const editedWeight = v.weight.replace(',', '.');
    await createCastration(
      {
        ID_veterinarian: Number(v.veterinarian),
        ID_appointment: actualAppointment.ID_appointment,
        age: v.age,
        weight: editedWeight,
        animalName: v.animalName,
        features: v.features || null,
      },
      actualAppointment.incomeForm.ID_income
    );
    closeDoneModal();
    fetch();
  };

  useEffect(() => {
    if (!actualAppointment || !actualAppointment.incomeForm) return;
    form.setValues({
      age: actualAppointment.incomeForm.age,
      weight:
        String(actualAppointment.incomeForm.weight) === 'null'
          ? ''
          : String(actualAppointment.incomeForm.weight),
      animalName: actualAppointment.incomeForm.animalName,
      features: actualAppointment.incomeForm.features || '',
      veterinarian: actualVeterinarian,
    });
  }, [actualAppointment]);

  return (
    <Modal
      opened={doneModal}
      onClose={closeDoneModal}
      title="¿Ha sido la castracion exitosa? (Completa los siguientes campos obligatorios)"
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
          <FormColumn
            inputType="select"
            form={form}
            name="veterinarian"
            label="Seleccione un Veterinario: "
            placeholder="Seleccione un Veterinario"
            span={12}
            data={veterinarians}
          />
          <Grid.Col span={12}>
            <Button color={mainColor} variant="light" type="submit" fullWidth>
              Si, ha sido exitosa
            </Button>
          </Grid.Col>
          <Grid.Col span={12}>
            <Button
              color={mainColor}
              variant="filled"
              fullWidth
              onClick={closeDoneModal}
            >
              Volver
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </Modal>
  );
}

export default DoneModal;
