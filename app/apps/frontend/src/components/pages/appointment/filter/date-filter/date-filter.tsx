import { UseFormReturnType } from '@mantine/form';
import FormColumn from '../../../../utilities/form-column/form-column';


interface props {
  type: 'all' | 'onlyOne' | 'interval';
  form: UseFormReturnType<any>;
}

export function DateFilter(props: props) {
  let dateFilter: JSX.Element | JSX.Element[];

  if (props.type === 'all') {
    dateFilter = (
      <FormColumn
        form={props.form}
        inputType="select"
        name="all"
        span={6}
        label=" "
        data={[{value: "", text: "Se muestran los turnos de todas las fechas", disabled: true}]}
        placeholder="Desde"
        notRequired
      />
    );
  } else if (props.type === 'interval') {
    dateFilter = [
      <FormColumn
        form={props.form}
        inputType="date"
        name="startDate"
        span={3}
        label="Intervalo de Fecha"
        placeholder="Desde"
        notRequired
      />,

      <FormColumn
        label=" "
        placeholder="Hasta"
        name="endDate"
        form={props.form}
        inputType="date"
        span={3}
        notRequired
      />,
    ];
  } else {
    dateFilter = (
      <FormColumn
        label="Dia"
        placeholder="Ingrese un día"
        name="date"
        form={props.form}
        inputType="date"
        span={6}
        notRequired
      />
    );
  }

  return dateFilter;
}

export default DateFilter;
