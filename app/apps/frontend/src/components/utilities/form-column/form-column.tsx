import { Grid, NativeSelect, Textarea, TextInput } from '@mantine/core';
import styles from './form-column.module.css';
import { UseFormReturnType } from '@mantine/form';
import { DatePickerInput, DateValue } from '@mantine/dates';

interface props {
  inputType: 'date' | 'text' | 'select' | 'textarea';
  form: UseFormReturnType<any>;
  span: number;
  placeholder?: string;
  label?: string;
  data?: { value: string; text: string; disabled?: boolean }[];
  name: string;
  notRequired?: boolean;
  minDate?: Date;
}

export function FormColumn(props: props) {
  let inputElement: JSX.Element;

  if (props.inputType === 'date') {
    inputElement = (
      <DatePickerInput
        key={props.form.key(props.name)}
        {...props.form.getInputProps(props.name)}
        label={props.label}
        placeholder={props.placeholder}
        minDate={props.minDate}
        required={props.notRequired === undefined ? true : false}
      />
    );
  } else if (props.inputType === 'select') {
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
      >
        {Options}
      </NativeSelect>
    );
  } else if (props.inputType === 'textarea') {
    inputElement = (
      <Textarea
        label={props.label}
        placeholder={props.placeholder}
        key={props.form.key(props.name)}
        {...props.form.getInputProps(props.name)}
      />
    );
  } else {
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

  return <Grid.Col span={props.span}>{inputElement}</Grid.Col>;
}

export default FormColumn;
