import { useForm, UseFormReturnType } from '@mantine/form';
import { useState, useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseIncomeForm {
  form: UseFormReturnType<any>;
}

export function useIncomeForm(): UseIncomeForm {
  const hours = ['8:00', '10:00', '12:00'];
  let currentHour: string = "8:00";
  hours.forEach((hour) => {
    const actualDate = new Date();
    const dateWithHour = new Date(
      `${actualDate.getFullYear()}-${
        actualDate.getMonth() + 1
      }-${actualDate.getDate()} ${hour === "8:00" ? "0" : ""}${hour}`
    );
    if(actualDate >= dateWithHour) {currentHour = hour};
  });
  const form = useForm({
    mode: 'controlled',
    initialValues: {
      date: new Date(),
      hour: currentHour
    },
  });

  return { form };
}

export default useIncomeForm;
