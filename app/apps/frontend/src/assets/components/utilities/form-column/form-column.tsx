import { Grid, NativeSelect, TextInput } from '@mantine/core';
import styles from './form-column.module.css';
import { UseFormReturnType } from '@mantine/form';
import { DatePickerInput } from '@mantine/dates';

class props {
  inputType!: 'date' | 'text' | 'select';
  form!: UseFormReturnType<any>;
  span!: number;
  placeholder?: string;
  label?: string;
  data?: { value: string; text: string; disabled?: boolean }[] = [];
  name!: string;
  onChange?: (event: Event) => {};
}

export function FormColumn(props: props) {
  const Input = () => {
    if (props.inputType === 'date') {
      return (
        <DatePickerInput
          name={props.form.key(props.name)}
          {...props.form.getInputProps(props.name)}
          label={props.label}
          placeholder={props.placeholder}
        />
      );
    } else if (props.inputType === 'select') {
      const Options = props.data?.map((data) => (
        <option value={data.value} disabled={data.disabled ? true : false}>
          {data.text}
        </option>
      ));

      return (
        <NativeSelect
          label={props.label}
          name={props.form.key(props.name)}
          {...props.form.getInputProps(props.name)}
        >
          {Options}
        </NativeSelect>
      );
    } else {
      return (
        <TextInput
          label={props.label}
          placeholder={props.placeholder}
          name={props.form.key(props.name)}
          {...props.form.getInputProps(props.name)}
        />
      );
    }
  };

  return (
    <Grid.Col span={props.span}>
      <Input />
    </Grid.Col>
  );
}

export default FormColumn;
