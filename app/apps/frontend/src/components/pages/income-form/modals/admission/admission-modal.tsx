import { Button, Grid, Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Appointment } from '../../../../../types/entities.types';
import FormColumn from '../../../../utilities/form-column/form-column';
import { useContext, useEffect, useState } from 'react';
import { MainColorContext } from '../../../../../contexts/color-context';
import useIncomeForm from '../../../../../hooks/income-form/use-income-form/use-income-form';
import useAppointment from '../../../../../hooks/appointment/use-appointment/use-appointment';
import { SelectData } from '../../../../../types/utilities.types';
import useDataEntities from '../../../../../hooks/general/use-data-entities/use-data-entities';

interface props {
  admissionModal: boolean;
  closeAdmissionModal: () => void;
  actualAppointment: Appointment | null;
  fetch: () => void;
  veterinarians: SelectData[];
  actualVeterinarian: string;
}

export function AdmissionModal({
  admissionModal,
  closeAdmissionModal,
  actualAppointment,
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
      weight: (value: string) => {
        if (value.length === 0) return null;
        if (!/^\d+([.,]\d+)?$/.test(value))
          return 'Solo puedes ingresar números y una única coma o punto decimal.';
        return null;
      },
    },
  });
  const { create } = useIncomeForm();
  const { editStatus } = useAppointment();
  const handleOnSubmit = async (v: typeof form.values) => {
    console.log(v);
    if (!actualAppointment) return;
    await editStatus(actualAppointment.ID_appointment, 'En Proceso');
    const editedWeight = v.weight.replace(',', '.');
    await create({
      ID_appointment: actualAppointment.ID_appointment,
      ID_veterinarian: Number(v.veterinarian) || null,
      age: v.age,
      animalName: v.animalName,
      features: v.features,
      weight: editedWeight,
    });
    closeAdmissionModal();
    fetch();
  };
  useEffect(() => {
    console.log(form.values);
    if (admissionModal) {
      form.reset();
    }
  }, [admissionModal]);

  useEffect(() => {
    form.setValues({
      veterinarian: actualVeterinarian,
    });
  }, [admissionModal]);
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
            notRequired
          />
          <FormColumn
            inputType="text"
            form={form}
            name="weight"
            label="Ingrese peso del animal(En KG): "
            placeholder="Peso del animal"
            span={12}
            notRequired
          />
          <FormColumn
            inputType="text"
            form={form}
            name="age"
            label="Ingrese Edad del animal y en que escala(Meses, Años, etc): "
            placeholder="Edad del animal(ej: 4años, 10 meses)"
            span={12}
            notRequired
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
            notRequired
          />
          <Grid.Col span={12}>
            <Button color={mainColor} variant="light" type="submit" fullWidth>
              Si, esta listo
            </Button>
          </Grid.Col>
          <Grid.Col span={12}>
            <Button
              color={mainColor}
              variant="filled"
              fullWidth
              onClick={closeAdmissionModal}
            >
              Volver
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </Modal>
  );
}

export default AdmissionModal;
