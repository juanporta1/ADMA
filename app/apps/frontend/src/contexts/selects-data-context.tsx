import { createContext, useState } from 'react';
import { AppoinmentSelects } from '../hooks/appointment/use-selects-data/use-selects-data';

const selectsData = {
    filterStatus: [],
    findBy: [],
    hour: [],
    neighborhood: [],
    orderBy: [],
    reason: [],
    sex: [],
    size: [],
    specie: [],
    status: [{ value: '', text: '' }]
  }

const setSelectsData = () => {}
export const SelectsDataContext = createContext({selectsData, setSelectsData});
