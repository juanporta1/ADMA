// Componente reutilizable para renderizar diferentes tipos de campos de formulario en una columna de Grid
import {
  Checkbox,
  Grid,
  NativeSelect,
  Textarea,
  TextInput,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { DatePickerInput, DateValue } from '@mantine/dates';
import { ChangeEventHandler } from 'react';
import { SelectData } from '../../../hooks/appointment/use-selects-data/use-selects-data';

interface props {
  inputType: 'date' | 'text' | 'select' | 'textarea' | 'checkbox';
  form: UseFormReturnType<any>;
  withoutGrid?: boolean | undefined;
  span?: number;
  placeholder?: string;
  label?: string;
  data?: SelectData[];
  name: string;
  notRequired?: boolean;
  minDate?: Date;
  onChangeDateFunc?: (date: DateValue) => void;
  onChangeSelectFunc?: ChangeEventHandler<HTMLSelectElement>;
}

// Renderiza el campo adecuado según el tipo especificado
export function FormColumn(props: props) {
  let inputElement: JSX.Element;

  if (props.inputType === 'date') {
    // Campo de fecha
    inputElement = (
      <DatePickerInput
        key={props.form.key(props.name)}
        {...props.form.getInputProps(props.name)}
        label={props.label}
        placeholder={props.placeholder}
        minDate={props.minDate}
        required={props.notRequired === undefined ? true : false}
        onChange={
          props.onChangeDateFunc
            ? props.onChangeDateFunc
            : (date: DateValue) => {
                props.form.setValues({ [props.name]: date });
              }
        }
      />
    );
  } else if (props.inputType === 'select') {
    // Campo de selección (select)
    let key = 0;
    const Options = props.data?.map((data) => {
      key++;
      return (
        <option
          key={key}
          value={data.value}
          disabled={data.disabled ? true : false}
        >
          {data.text}
        </option>
      );
    });

    inputElement = (
      <NativeSelect
        label={props.label}
        key={props.form.key(props.name)}
        {...props.form.getInputProps(props.name)}
        required={props.notRequired === undefined ? true : false}
        onChange={
          props.onChangeSelectFunc
            ? props.onChangeSelectFunc
            : (e) => {
                props.form.setValues({ [props.name]: e.target.value });
              }
        }
      >
        {Options}
      </NativeSelect>
    );
  } else if (props.inputType === 'textarea') {
    // Campo de texto multilínea
    inputElement = (
      <Textarea
        label={props.label}
        placeholder={props.placeholder}
        key={props.form.key(props.name)}
        {...props.form.getInputProps(props.name)}
      />
    );
  } else if (props.inputType === 'checkbox') {
    inputElement = (
      <Checkbox
        label={props.label}
        key={props.form.key(props.name)}
        {...props.form.getInputProps(props.name)}
      />
    );
  } else {
    // Campo de texto simple
    inputElement = (
      <TextInput
        label={props.label}
        placeholder={props.placeholder}
        key={props.form.key(props.name)}
        {...props.form.getInputProps(props.name)}
        required={props.notRequired === undefined ? true : false}
      />
    );
  }

  // Devuelve el campo dentro de una columna del grid
  if(props.withoutGrid === undefined) return <Grid.Col span={props.span}>{inputElement}</Grid.Col>;
  else return inputElement
}

export default FormColumn;
