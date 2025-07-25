import { useForm, UseFormReturnType } from '@mantine/form';
import axios, { AxiosResponse } from 'axios';
import { features } from 'process';
import { useState, useCallback, useContext } from 'react';
import { ApiHostContext } from '../../../contexts/api-host-context';
import { Veterinarian } from '../../../types/data-entities.types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseIncomeForm {
  form: UseFormReturnType<any>;
  create: (income: Income) => Promise<Income | void | AxiosResponse<any, any>>;
  createCastration: (
    income: DoneIncome,
    id: number
  ) => Promise<void | AxiosResponse<any, any>>;
}

export interface Income {
  ID_appointment: number;
  ID_veterinarian?: number | null;
  age?: string;
  weight?: string;
  animalName?: string;
  features?: string;
}

export interface DoneIncome {
  ID_appointment: number;
  ID_veterinarian: number;
  age: string;
  weight: string;
  animalName: string;
  features?: string | null;
  observations?: string | null;
}

export function useIncomeForm(): UseIncomeForm {
  const hours = ['8:00', '10:00', '12:00'];
  let currentHour: string = '8:00';
  hours.forEach((hour) => {
    const actualDate = new Date();
    const dateWithHour = new Date(
      `${actualDate.getFullYear()}-${
        actualDate.getMonth() + 1
      }-${actualDate.getDate()} ${hour === '8:00' ? '0' : ''}${hour}`
    );
    if (actualDate >= dateWithHour) {
      currentHour = hour;
    }
  });
  const form = useForm({
    mode: 'controlled',
    initialValues: {
      date: new Date(),
      hour: currentHour,
      veterinarian: null as Veterinarian | null,
    },
  });

  const host = useContext(ApiHostContext);
  const create = async (income: Income) => {
    try {
      const newIncome = await axios.post(`${host}/income-form`, income);
      return newIncome;
    } catch (err) {
      throw err;
    }
  };

  const createCastration = async (income: DoneIncome, id: number) => {
    try {
      const newCastration = await axios.post(`${host}/castration`, income);
      return newCastration;
    } catch (err) {
      throw err;
    }
  };

  return { form, create, createCastration };
}

export default useIncomeForm;
