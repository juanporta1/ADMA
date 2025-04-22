import { Button, Checkbox, Flex, Popover, Text, Tooltip } from '@mantine/core';
import { useContext } from 'react';
import { MainColorContext } from '../../../../../contexts/color-context';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDisclosure } from '@mantine/hooks';

interface props {
  values: string[];
  setValues: (values: string[]) => void;
}

export function ColumnsMenu(props: props) {
  const mainColor = useContext(MainColorContext);
  const [opened, { toggle, close }] = useDisclosure(false);
  return (
    <Popover shadow="md" opened={opened}>
      <Tooltip label="Columnas de la tabla del PDF">
        <Popover.Target>
          <Button onClick={toggle} color={mainColor} variant="filled">
            <FontAwesomeIcon icon={opened ? faArrowUp : faArrowDown} />
          </Button>
        </Popover.Target>
      </Tooltip>
      <Popover.Dropdown title="Columnas">
        <Text c={'#aaaa'} size="sm">
          Columnas que seran añadidas al PDF
        </Text>

        <Checkbox.Group
          defaultValue={props.values}
          onChange={props.setValues}
          style={{ gap: '10px' }}
        >
          <Flex
            direction={'column'}
            gap={'sm'}
            style={{ marginTop: '20px', marginBottom: '20px' }}
          >
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
            <Checkbox label="Barrio" value={'Barrio'} color={mainColor} />
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
        <Button onClick={toggle} color={mainColor} variant="filled">
          Guardar
        </Button>
      </Popover.Dropdown>
    </Popover>
  );
}

export default ColumnsMenu;
