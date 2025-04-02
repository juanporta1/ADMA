import { useEffect, useRef, useState } from 'react';
import styles from './abm.module.css';
import { Button, Table, Paper, Modal, Flex, TextInput, NativeSelect, Grid} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from "@mantine/notifications";
import { useForm } from '@mantine/form';
import { DateTimePicker} from '@mantine/dates';
 
class Appoinment{
  ID_appoinment!: number;
  owner!: string;
  home!: string;
  neighborhood!: string;
  phone!: string;
  dni!: number;
  date!: Date;
  size!: "Grande" | "Pequeño" | "Mediano";
  sex!: "Macho" | "Hembra";
  race!: "Perro" | "Gato";

}

interface formValues{ 
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
    mode: "controlled",
    initialValues: {
      date: null,
      owner: "",
      neighborhood: "",
      home: "",
      phone: "",
      size: "",
      dni: "",
      sex: "",
      race: ""
    },
    validate:{
      owner: (value: string) => {
        if (value.length === 0) return "Este campo debe estar completo.";
        else if (/[^a-zA-Z\s]/.test(value)) return "El nombre unicamente debe contener letras.";
        else return null;
      },
      home: (value: string) => {
        if (value.length === 0) return "Este campo debe estar completo.";
        else return null;
      },
      dni: (value: string) => {
        if (value.length === 0) return "Este campo debe estar completo.";
        else if (!/^\d$/.test(value)) return "El DNI solo puede contener numeros.";
        else return null;
      },
      phone: (value: string) => {
        if (value.length === 0) return "Este campo debe estar completo.";
        else if (!/^\d$/.test(value)) return "El Telefono solo puede contener numeros.";
        else return null;
      },
      size: (value: string) => value === "" ? "Debe seleccionar un tamaño" : null,
      sex: (value: string) => value === "" ? "Debe seleccionar un sexo" : null,
      neighborhood: (value: string) => value === "" ? "Debe seleccionar un barrio" : null,
      race: (value: string) => value === "" ? "Debe seleccionar una raza" : null,
      date: (value) => value ? null : "Debe ingresar una fecha." 


    },
  })
  const neighborhoodInputData: string[] = [
    "Córdoba",
    "La Perla",
    "Liniers",
    "Parque San Juan",
    "Parque Virrey Este",
    "Portales del Sol",
    "Residencial El Crucero",
    "Sabattini",
    "Sur",
    "Tiro Federal y Piedra del Sapo",
    "Touring",
    "Villa Camiares",
    "General Bustos",
    "Nuevo Amanecer",
    "Villa Oviedo",
    "Parque Virrey Oeste",
    "Lalahenes",
    "San Martín/25 de Mayo",
    "Santa Teresa/Jesús",
    "El Cañito",
    "Pellegrini",
    "Norte",
    "San Juan",
    "Don Bosco",
    "Liniers"
  ];

  const refs = useRef<Map<number , HTMLDivElement>>(new Map());
  const [data, setData] = useState<Appoinment[]>([]);
  const [actualRegister, setActualRegister] = useState<Appoinment | null>(null);
  const [ deleteModalValue, {open: openDelete, close: closeDelete}] = useDisclosure(false);
  const [ createModalValue, {open: openCreate, close: closeCreate}] = useDisclosure(false);
  
  const handleOnSubmit = (values: formValues) => {
    console.log(values);
  }


  const openDeleteAlert = () => {
      if (actualRegister !== null){
        openDelete()
      }
  }

  const getAll = async () => {
    try{
      const response = await fetch("http://localhost:3000/api/appoinment/get-all")
      if (!response.ok) throw new Error("Ha ocurrido un error con la API");
      const result: Appoinment[] = await response.json()
      console.log(result)
      result.forEach(appoinment => {
        const newDate = new Date(appoinment.date);
        appoinment.date = newDate;
      })
      setData(result);
    }catch(error){
      throw error
    }
  }

  

  const removeRegister = async (id: number) => {
    const response = await fetch(`http://localhost:3000/api/appoinment/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    }).catch((err) => {
      throw err
    });

    if(response.ok){
      const newData = data.filter((register) => register.ID_appoinment != id);
      setData(newData);
    }
    return response.ok
  }

  const deleteNotificationHandler =  async () => {
    if (actualRegister !== null){
      const ok = await removeRegister(actualRegister.ID_appoinment);
      if(ok){
        notifications.show({
          position: "top-left",
          title: 'El registro se ha borrado con exito.',
          message: 'Puedes cerrar esta notificacion.',
          color: "green"
        })
      }else{
        notifications.show({
          position: "top-left",
          title: 'No se ha podido eliminar este registro.',
          message: 'Reintena en un momento.',
          color: "red"

        })
      }
      close();
    }}

  const neighborhoodOptions = () => {
    return neighborhoodInputData.map((value, key) => <option value={value} key={key}>{value}</option>)
  }

  const Rows = () => {
    return data.map((register: Appoinment) => {
      
      const day = `${register.date.getDay()}/${register.date.getMonth()}/${register.date.getFullYear()}`
      const hour = `${register.date.getHours()}:${register.date.getMinutes()}`

      return (<Table.Tr ref={(div) => refs.current.set(register.ID_appoinment, div!)} onClick={(e) => {
        setActualRegister(register);
      }} className={styles.register}>  
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
      </Table.Tr>)
    }
  )

  }

  useEffect(() => {
    if (actualRegister){
      refs.current.get(actualRegister.ID_appoinment)!.style = "background-color: #ccc";
    }
  }, [actualRegister])

  useEffect(() => {
    getAll();
  }, [])

  useEffect(() => {
    if (!createModalValue){
      form.reset();
      
    }
  }, [createModalValue])

  // useEffect(() => {
  //   console.log(actualRegister)
  // }, [actualRegister])
  return (
    
    <div className={styles.mainBox}>
      
      <Paper shadow="lg" radius="xs">
        <div className={styles.interactionBox}>
          <div className={styles.buttonBox}>
            <Button onClick={() => {
              openCreate();
            }} w="150px" variant="filled" color="#86457c" size='md'>Alta</Button>
            <Button onClick={openDeleteAlert} w="150px" variant="filled" color="#86457c" size='md'>Baja</Button>
            <Button w="150px" variant="filled" color="#86457c" size='md'>Modificacion</Button>
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
      <Modal centered onClose={closeDelete} opened={deleteModalValue} title="¿Seguro quieres borrar este registro?" w={100}>
      
        <Flex  miw={100} mih={50} gap="sm" justify="center" align="center" direction="row" wrap="nowrap">
          <Button w="150px" variant="filled" color="#86457c" size='md' onClick={deleteNotificationHandler}>Si</Button>
          <Button w="150px" variant="filled" color="#86457c" size='md' onClick={closeDelete}>No</Button>
        </Flex>
      </Modal>
          
      <Modal centered onClose={closeCreate} opened={createModalValue} title="Agendar nuevo Turno">
        <form onSubmit={form.onSubmit(handleOnSubmit)}>
          <Grid>
            <Grid.Col span={12}>
              <DateTimePicker key={form.key("date")} {...form.getInputProps("date")} label='Fecha' placeholder='DD/MM/YYYY HH:MM' minDate={new Date()}/>
            </Grid.Col>            
              
            <Grid.Col span={12}>
              <TextInput  key={form.key("owner")} {...form.getInputProps("owner")} placeholder='Ingrese Nombre y Apellido' label='Dueño'  />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput key={form.key("home")} {...form.getInputProps("home")} placeholder='Domicilio' label='Ingrese Domicilio'  />
            </Grid.Col>
            <Grid.Col span={12}>
              <NativeSelect key={form.key("neighborhood")} {...form.getInputProps("neighborhood")} label='Barrio'  >
                <option value="" disabled>Seleccione un barrio</option>
                {neighborhoodOptions()}
              </NativeSelect>
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput key={form.key("dni")} {...form.getInputProps("dni")} placeholder='Ingrese DNI' label='DNI'  />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput key={form.key("phone")} {...form.getInputProps("phone")} placeholder='Ingrese un Telefono' label='Teléfono'  />
            </Grid.Col>
            <Grid.Col span={12}>
              <NativeSelect key={form.key("size")} {...form.getInputProps("size")} label='Tamaño'  >
                <option value="" disabled>Seleccione un tamaño</option>

                <option value='Grande'>Grande</option>
                <option value="Mediano">Mediano</option>
                <option value="Pequeño">Pequeño</option>
              </NativeSelect>
            </Grid.Col>
            <Grid.Col span={6}>
              
              <NativeSelect label='Sexo' key={form.key("sex")} {...form.getInputProps("sex")}>
                <option value="" disabled>Seleccione un sexo</option>

                <option value='Macho'>Macho</option>
                <option value="Hembra">Hembra</option>

              </NativeSelect>
               
            </Grid.Col>            
            <Grid.Col span={6}>

              <NativeSelect label='Raza' key={form.key("race")} {...form.getInputProps("race")}>
                <option value="" disabled>Seleccione una raza</option>

                <option value='Perro'>Perro</option>
                <option value="Gato">Gato</option>  
              </NativeSelect>
            </Grid.Col> 
            <Grid.Col span={12}>
              <Button type='submit' variant="filled" color="#86457c" style={{width: "100%"}}>Cargar Turno</Button>
            </Grid.Col>
            <Grid.Col span={12}>
              <Button variant="default" style={{width: "100%"}} onClick={closeCreate}>Cancelar</Button>
            </Grid.Col>
          </Grid>
        </form>
      </Modal>

    </div>

    
  );
}

export default Abm;
