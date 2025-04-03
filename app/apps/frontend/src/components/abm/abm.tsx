import { useEffect, useRef, useState } from 'react';
import styles from './abm.module.css';
import { format } from 'date-fns';
import { es } from 'date-fns/locale'
import {
  Button,
  Table,
  Paper,
  Modal,
  Flex,
  TextInput,
  NativeSelect,
  Grid,
  LoadingOverlay,
  Loader,
  ScrollArea,
  Box,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { DateTimePicker } from '@mantine/dates';
import App from '../../app/app';

class Appoinment {
  ID_appoinment!: number;
  owner!: string;
  home!: string;
  neighborhood!: string;
  phone!: string;
  dni!: string;
  date!: Date;
  size!: 'Grande' | 'Pequeño' | 'Mediano';
  sex!: 'Macho' | 'Hembra';
  race!: 'Perro' | 'Gato';
}

type formValues = {
  date: Date | null;
  owner: string;
  neighborhood: string;
  home: string;
  phone: string;
  size: string;
  dni: string;
  sex: string;
  race: string;
}

export function Abm() {
  const form = useForm({
    mode: 'controlled',
    initialValues: {
      date: new Date,
      owner: '',
      neighborhood: '',
      home: '',
      phone: '',
      size: '',
      dni: '',
      sex: '',
      race: '',
    },
    validate: {
      owner: (value: string) => {
        if (value.length === 0) return 'Este campo debe estar completo.';
        else if (/[^a-zA-Z\s]/.test(value))
          return 'El nombre unicamente debe contener letras.';
        else return null;
      },
      home: (value: string) => {
        if (value.length === 0) return 'Este campo debe estar completo.';
        else return null;
      },
      dni: (value: string) => {
        if (value.length === 0) return 'Este campo debe estar completo.';
        else if (!/^\d+$/.test(value))
          return 'El DNI solo puede contener numeros.';
        else return null;
      },
      phone: (value: string) => {
        if (value.length === 0) return 'Este campo debe estar completo.';
        else if (!/^\d+$/.test(value))
          return 'El Telefono solo puede contener numeros.';
        else return null;
      },
      size: (value: string) =>
        value === '' ? 'Debe seleccionar un tamaño' : null,
      sex: (value: string) =>
        value === '' ? 'Debe seleccionar un sexo' : null,
      neighborhood: (value: string) =>
        value === '' ? 'Debe seleccionar un barrio' : null,
      race: (value: string) =>
        value === '' ? 'Debe seleccionar una raza' : null,
      date: (value: Date | null) => (value ? null : 'Debe ingresar una fecha.'),
    },
  });
  const neighborhoodInputData: string[] = [
    'Córdoba',
    'La Perla',
    'Liniers',
    'Parque San Juan',
    'Parque Virrey Este',
    'Portales del Sol',
    'Residencial El Crucero',
    'Sabattini',
    'Sur',
    'Tiro Federal y Piedra del Sapo',
    'Touring',
    'Villa Camiares',
    'General Bustos',
    'Nuevo Amanecer',
    'Villa Oviedo',
    'Parque Virrey Oeste',
    'Lalahenes',
    'San Martín/25 de Mayo',
    'Santa Teresa/Jesús',
    'El Cañito',
    'Pellegrini',
    'Norte',
    'San Juan',
    'Don Bosco',
    'Liniers',
  ];

  const refs = useRef<Map<number, HTMLDivElement>>(new Map());
  const [data, setData] = useState<Appoinment[]>([]);
  const [actualRegister, setActualRegister] = useState<Appoinment | null>(null);
  const [deleteModalVar, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);
  const [postModalVar, { open: openPostModal, close: closePostModal }] =
    useDisclosure(false);
  const [loaderVar, { open: makeLoaderVisible, close: makeLoaderInvisible }] = useDisclosure(false);
  const [patchModalVar, {open: openPatchModal, close: closePatchModal}] = useDisclosure(false);
  const [canEdit, setCanEdit] = useState(false);


  const openDeleteAlert = () => {
    if (actualRegister !== null) {
      openDeleteModal();
    }
  };

  const onClickModify = () => {
    if(actualRegister){
      openPatchModal()
    }
  }

  const getAll = async () => {
    try {
      const response = await fetch(
        'http://localhost:3000/api/appoinment/get-all'
      );
      if (!response.ok) throw new Error('Ha ocurrido un error con la API');
      const result: Appoinment[] = await response.json();
      console.log(result);
      result.forEach((appoinment) => {
        const newDate = new Date(appoinment.date);
        appoinment.date = newDate;
      });
      setData(result);
    } catch (error) {
      throw error;
    }
  };

  const removeRegister = async (id: number) => {
    const response = await fetch(
      `http://localhost:3000/api/appoinment/delete/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).catch((err) => {
      throw err;
    });

    if (response.ok) {
      const newData = data.filter((register) => register.ID_appoinment != id);
      setData(newData);
    }
    return response.ok;
  };

  const handleOnSubmit = async (values: formValues) => {
    try {
      makeLoaderVisible();
      const response = await fetch("http://localhost:3000/api/appoinment/create/one",{
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
      
      makeLoaderInvisible();
      closePostModal();
      if(response.ok) getAll();
      const data = await response.json();
      console.log('Respuesta del servidor: ', data);
      postNotificationHandler();
    } catch (err) {
      makeLoaderInvisible();
      throw err;
    }
  };

  const handleOnEdit = async (values: formValues) => {
    try{
      makeLoaderInvisible();

      const newColumns = {}


      

      const response = await fetch(`http://localhost:3000/api/appoinment/update/${actualRegister?.ID_appoinment}`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body : JSON.stringify({
          ...values
        })
      });

      if(!response.ok){
        const data = await response.json();
        console.log("La edicion se realizo con exit: ", data)
      }
      makeLoaderInvisible();
      closePatchModal();
      getAll();
      
    }catch(err){
      makeLoaderInvisible();
      throw err

    }

  }

  const postNotificationHandler= async () => {
    notifications.show({
      position: 'top-left',
      title: 'El registro se ha creado con exito.',
      message: 'Puedes cerrar esta notificacion.',
      color: 'green',
    });
  }

  const deleteNotificationHandler = async () => {
    
    if (actualRegister !== null) {
      const ok = await removeRegister(actualRegister.ID_appoinment);
      if (ok) {
        notifications.show({
          position: 'top-left',
          title: 'El registro se ha borrado con exito.',
          message: 'Puedes cerrar esta notificacion.',
          color: 'green',
        });
        setActualRegister(null);
      } else {
        notifications.show({
          position: 'top-left',
          title: 'No se ha podido eliminar este registro.',
          message: 'Reintena en un momento.',
          color: 'red',
        });
      }
      
      closeDeleteModal();
       
    }
  };

  const neighborhoodOptions = () => {
    return neighborhoodInputData.map((value, key) => (
      <option value={value} key={key}>
        {value}
      </option>
    ));
  };

  const Rows = () => {
    return data.map((register: Appoinment) => {
      const day = `${register.date.getDay()}/${register.date.getMonth()}/${register.date.getFullYear()}`;
      const hour = format(register.date, "HH:mm")

      return (
        <Table.Tr
          ref={(div) => refs.current.set(register.ID_appoinment, div!)}
          onClick={(e) => {
            setActualRegister(register);
          }}
          className={styles.register}
        >
          <Table.Td>{register.ID_appoinment}</Table.Td>
          <Table.Td>{register.owner}</Table.Td>
          <Table.Td>{register.home}</Table.Td>
          <Table.Td>{register.neighborhood}</Table.Td>
          <Table.Td>{register.phone}</Table.Td>
          <Table.Td>{register.dni}</Table.Td>
          <Table.Td>{day}</Table.Td>
          <Table.Td>{hour}</Table.Td>
          <Table.Td>{register.size}</Table.Td>
          <Table.Td>{register.sex}</Table.Td>
          <Table.Td>{register.race}</Table.Td>
        </Table.Tr>
      );
    });
  };

  const SubmitButton = () => (
              <Button
                variant="filled"
                color="#86457c"
                style={{ width: '100%' }}
                type='submit'
              >
               Completar Edicion
              </Button>
  );
  const StartEditionButton = () => (
    <Button
      variant="filled"
      color="#86457c"
      style={{ width: '100%' }}
      onClick={() => setCanEdit(canEdit ? false : true)}
    >
     Editar
    </Button>
);

  useEffect(() => {
    if (actualRegister) {
      refs.current.get(actualRegister.ID_appoinment)!.style =
        'background-color: #ccc';
    }
  }, [actualRegister]);

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    if (!postModalVar || !patchModalVar) {
      form.reset();
      setCanEdit(false);
    }
  
    if(patchModalVar){
      if(actualRegister){
        const {ID_appoinment, ...objectWithoutId} = actualRegister
        form.setValues(objectWithoutId)
      }
    }

  }, [postModalVar, patchModalVar]);

  // useEffect(() => {
  //   console.log(actualRegister)
  // }, [actualRegister])
  return (
    <div className={styles.mainBox}>
      <Paper shadow="lg" radius="xs">
        <div className={styles.interactionBox}>
          <div className={styles.buttonBox}>
            <Button
              onClick={() => {
                openPostModal();
              }}
              w="150px"
              variant="filled"
              color="#86457c"
              size="md"
            >
              Alta
            </Button>
            <Button
              onClick={openDeleteAlert}
              w="150px"
              variant="filled"
              color="#86457c"
              size="md"
            >
              Baja
            </Button>
            <Button onClick={onClickModify} w="150px" variant="filled" color="#86457c" size="md">
              Modificacion
            </Button>
          </div>
          <div className={styles.registersBox}>
            <Table stickyHeader>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>ID</Table.Th>
                  <Table.Th>Dueño</Table.Th>
                  <Table.Th>Domicilio</Table.Th>
                  <Table.Th>Barrio</Table.Th>
                  <Table.Th>Telefono</Table.Th>
                  <Table.Th>DNI</Table.Th>
                  <Table.Th>Fecha</Table.Th>
                  <Table.Th>Hora</Table.Th>
                  <Table.Th>Tamaño</Table.Th>
                  <Table.Th>Sexo</Table.Th>
                  <Table.Th>Raza</Table.Th>
                </Table.Tr>
              </Table.Thead>

              {data.length > 0 ? <Rows></Rows> : <></>}
            </Table>
          </div>
        </div>
      </Paper>
      
      
        
        <Modal
          centered
          onClose={closeDeleteModal}
          opened={deleteModalVar}
          title="¿Seguro quieres borrar este registro?"
          w={100}
          style={{height: "500px"}}
        >
          
          <Flex
            miw={100}
            mih={50}
            gap="sm"
            justify="center"
            align="center"
            direction="row"
            wrap="nowrap"
          >
            <Button
              w="150px"
              variant="filled"
              color="#86457c"
              size="md"
              onClick={deleteNotificationHandler}
            >
              Si
            </Button>
            <Button
              w="150px"
              variant="filled"
              color="#86457c"
              size="md"
              onClick={closeDeleteModal}
            >
              No
            </Button>
          </Flex>
        </Modal>
      
      <Modal
        centered
        onClose={closePostModal}
        opened={postModalVar}
        title="Agendar nuevo Turno"
        withCloseButton={false}
        mah="100vh"
        scrollAreaComponent={ScrollArea.Autosize}
        size="lg"
      >
        
        <LoadingOverlay
          visible={loaderVar}
          loaderProps={{ children: <Loader color="#86457c" /> }}
        />
        <form onSubmit={form.onSubmit(handleOnSubmit)}>
          <Grid gutter="xs">
            <Grid.Col span={12}>
              <DateTimePicker
                key={form.key('date')}
                {...form.getInputProps('date')}
                label="Fecha"
                placeholder="DD/MM/YYYY HH:MM"
                minDate={new Date()}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <TextInput
                key={form.key('owner')}
                {...form.getInputProps('owner')}
                placeholder="Ingrese Nombre y Apellido"
                label="Dueño"
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                key={form.key('home')}
                {...form.getInputProps('home')}
                placeholder="Ingrese un Domicilio"
                label="Domicilio"
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <NativeSelect
                key={form.key('neighborhood')}
                {...form.getInputProps('neighborhood')}
                label="Barrio"
              >
                <option value="" disabled>
                  Seleccione un barrio
                </option>
                {neighborhoodOptions()}
              </NativeSelect>
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                key={form.key('dni')}
                {...form.getInputProps('dni')}
                placeholder="Ingrese DNI"
                label="DNI"
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                key={form.key('phone')}
                {...form.getInputProps('phone')}
                placeholder="Ingrese un Telefono"
                label="Teléfono"
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <NativeSelect
                key={form.key('size')}
                {...form.getInputProps('size')}
                label="Tamaño"
              >
                <option value="" disabled>
                  Seleccione un tamaño
                </option>

                <option value="Grande">Grande</option>
                <option value="Mediano">Mediano</option>
                <option value="Pequeño">Pequeño</option>
              </NativeSelect>
            </Grid.Col>
            <Grid.Col span={6}>
              <NativeSelect
                label="Sexo"
                key={form.key('sex')}
                {...form.getInputProps('sex')}
              >
                <option value="" disabled>
                  Seleccione un sexo
                </option>

                <option value="Macho">Macho</option>
                <option value="Hembra">Hembra</option>
              </NativeSelect>
            </Grid.Col>
            <Grid.Col span={6}>
              <NativeSelect
                label="Raza"
                key={form.key('race')}
                {...form.getInputProps('race')}
              >
                <option value="" disabled>
                  Seleccione una raza
                </option>

                <option value="Perro">Perro</option>
                <option value="Gato">Gato</option>
              </NativeSelect>
            </Grid.Col>
            <Grid.Col span={12}>
              <Button
                variant="filled"
                color="#86457c"
                style={{ width: '100%' }}
                type='submit'
              >
                Cargar Turno
              </Button>
            </Grid.Col>
            <Grid.Col span={12}>
              <Button
                variant="default"
                style={{ width: '100%' }}
                onClick={closePostModal}
              >
                Cancelar
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Modal>
      <Modal
        centered
        onClose={closePatchModal}
        opened={patchModalVar}
        title="Modificar Turno"
        withCloseButton={false}
        mah="100vh"
        scrollAreaComponent={ScrollArea.Autosize}
        size="lg"
      >
        
        <LoadingOverlay
          visible={loaderVar}
          loaderProps={{ children: <Loader color="#86457c" /> }}
        />
        <form onSubmit={form.onSubmit(handleOnEdit)} aria-disabled={canEdit}>
          <Grid gutter="xs">
            <Grid.Col span={12}>
              <DateTimePicker
                key={form.key('date')}
                {...form.getInputProps('date')}
                label="Fecha"
                placeholder="DD/MM/YYYY HH:MM"
                minDate={new Date()}
                {...{"disabled": canEdit ? false : true}}/>
            </Grid.Col>

            <Grid.Col span={12}>
              <TextInput
                key={form.key('owner')}
                {...form.getInputProps('owner')}
                placeholder="Ingrese Nombre y Apellido"
                label="Dueño"
                {...{"disabled": canEdit ? false : true}}/>
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                key={form.key('home')}
                {...form.getInputProps('home')}
                placeholder="Ingrese un Domicilio"
                label="Domicilio"
                {...{"disabled": canEdit ? false : true}}/>
            </Grid.Col>
            <Grid.Col span={12}>
              <NativeSelect
                key={form.key('neighborhood')}
                {...form.getInputProps('neighborhood')}
                label="Barrio"
                {...{"disabled": canEdit ? false : true}}>
                <option value="" disabled>
                  Seleccione un barrio
                </option>
                {neighborhoodOptions()}
              </NativeSelect>
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                key={form.key('dni')}
                {...form.getInputProps('dni')}
                placeholder="Ingrese DNI"
                label="DNI"
                {...{"disabled": canEdit ? false : true}}/>
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                key={form.key('phone')}
                {...form.getInputProps('phone')}
                placeholder="Ingrese un Telefono"
                label="Teléfono"
                {...{"disabled": canEdit ? false : true}}/>
            </Grid.Col>
            <Grid.Col span={12}>
              <NativeSelect
                key={form.key('size')}
                {...form.getInputProps('size')}
                label="Tamaño"
              {...{"disabled": canEdit ? false : true}}>
                <option value="" disabled>
                  Seleccione un tamaño
                </option>

                <option value="Grande">Grande</option>
                <option value="Mediano">Mediano</option>
                <option value="Pequeño">Pequeño</option>
              </NativeSelect>
            </Grid.Col>
            <Grid.Col span={6}>
              <NativeSelect
                label="Sexo"
                key={form.key('sex')}
                {...form.getInputProps('sex')}
                {...{"disabled": canEdit ? false : true}}>
                <option value="" disabled>
                  Seleccione un sexo
                </option>

                <option value="Macho">Macho</option>
                <option value="Hembra">Hembra</option>
              </NativeSelect>
            </Grid.Col>
            <Grid.Col span={6}>
              <NativeSelect
                label="Raza"
                key={form.key('race')}
                {...form.getInputProps('race')}
              {...{"disabled": canEdit ? false : true}}>
                <option value="" disabled>
                  Seleccione una raza
                </option>

                <option value="Perro">Perro</option>
                <option value="Gato">Gato</option>
              </NativeSelect>
            </Grid.Col>
            <Grid.Col span={12}>
              {canEdit  ?  <SubmitButton /> : <StartEditionButton />}
            </Grid.Col>
            <Grid.Col span={12}>
              <Button
                variant="default"
                style={{ width: '100%' }}
                onClick={closePatchModal}
              >
                Cancelar
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Modal>
    </div>
  );
}

export default Abm;
