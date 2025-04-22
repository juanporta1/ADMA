import { Button, Checkbox, Flex, Popover, Text, Tooltip } from '@mantine/core';
import styles from './columns-menu.module.css';
import { useContext } from 'react';
import { MainColorContext } from '../../../../../contexts/color-context';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UseFormReturnType } from '@mantine/form';
import FormColumn from '../../../../utilities/form-column/form-column';

interface props {
  values: string[];
  setValues: (values: string[]) => void;
}

export function ColumnsMenu(props: props) {
  const mainColor = useContext(MainColorContext);

  return (
    <Tooltip label="Columnas de la tabla del PDF">
      <Popover shadow="md">
        <Popover.Target>
          <Button onClick={() => {}} color={mainColor} variant="filled">
            <FontAwesomeIcon icon={faArrowDown} />
          </Button>
        </Popover.Target>

        <Popover.Dropdown title="Columnas">
          <Text c={'#aaaa'} size="sm">
            Columnas que seran añadidas al PDF
          </Text>

          <Checkbox.Group
            defaultValue={props.values}
            onChange={props.setValues}
            style={{ gap: '10px' }}
          >
            <Flex direction={'column'} gap={'sm'} style={{ marginTop: '20px' }}>
              <Checkbox
                label="Nombre y Apellido"
                value={'Dueño'}
                color={mainColor}
                disabled
                checked
              />
              <Checkbox label="Fecha" value={'Fecha'} color={mainColor} />
              <Checkbox label="Hora" value={'Hora'} color={mainColor} />
              <Checkbox label="DNI" value={'DNI'} color={mainColor} />
              <Checkbox label="Teléfono" value={'Teléfono'} color={mainColor} />
              <Checkbox
                label="Barrio"
                value={'Barrio'}
                color={mainColor}
              />
              <Checkbox label="Domicilio" value={'Domicilio'} color={mainColor} />
              <Checkbox label="Sexo" value={'Sexo'} color={mainColor} />
              <Checkbox label="Tamaño" value={'Tamaño'} color={mainColor} />
              <Checkbox label="Especie" value={'Especie'} color={mainColor} />
              <Checkbox label="Estado" value={'Estado'} color={mainColor} />
              <Checkbox label="Razón" value={'Razón'} color={mainColor} />
              <Checkbox
                label="Observaciones"
                value={'Observaciones'}
                color={mainColor}
              />
            </Flex>
          </Checkbox.Group>
        </Popover.Dropdown>
      </Popover>
    </Tooltip>
  );
}

export default ColumnsMenu;
