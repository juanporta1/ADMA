import { useDisclosure } from '@mantine/hooks';
import {
  Accordion,
  AppShell,
  Avatar,
  Burger,
  Center,
  createTheme,
  Divider,
  Flex,
  Group,
  Image,
  MantineProvider,
  NavLink,
  Stack,
  Text,
} from '@mantine/core';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './layout.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faGear,
  faCalendarCheck,
  faFilter,
  faArrowUpFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import NavLinksContainer from '../utilities/nav-links-containter/nav-links-container';
export function Layout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <MantineProvider>
      <AppShell
        header={{ height: { base: 60, md: 70, lg: 80 } }}
        navbar={{
          width: { base: 100, md: 150, lg: 200 },
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header style={{ backgroundColor: '#6c5b7b', border: 'none' }}>
          <Flex direction={"row"}>
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
              style={{ marginRight: '10px' }}
            />
            
          </Group>
          
          </Flex>
          
          {/* <Image
              src="https://altagracia.gob.ar/wp-content/uploads/2022/11/SALUD_ANIMAL_LOGO-removebg-preview.png"
              h={"60px"}
              radius={"md"}
              style={{zIndex: 1000}}
            /> */}
        </AppShell.Header>
        <AppShell.Navbar style={{ backgroundColor: '#f3f0f9' }}>
          <Stack h="100%" justify="space-between">
            <Stack gap={0}>
              <Text size="xl" fw={700} c="#6c5b7b" p="md" ta="center">
                Secciones
              </Text>

              <Text size="md" fw={700} tt="uppercase" c="dimmed" p="xs">
                Gestión
              </Text>
              <NavLinksContainer
                mainNavLink={{
                  goTo: '',
                  label: 'Turnos',
                  icon: <FontAwesomeIcon icon={faCalendarCheck} />,
                }}
                childrenNavs={[
                  {
                    goTo: '/turnos/listar',
                    label: 'Listar',
                    icon: <FontAwesomeIcon icon={faFilter} />,
                  },
                  {
                    goTo: '/turnos/nuevo',
                    label: 'Nuevo',
                    icon: <FontAwesomeIcon icon={faArrowUpFromBracket} />,
                  },
                ]}
              />

              <Text size="md" fw={700} tt="uppercase" c="dimmed" p="xs">
                Ajustes
              </Text>
              <NavLinksContainer
                mainNavLink={{
                  goTo: '',
                  label: 'Configuración',
                  icon: <FontAwesomeIcon icon={faGear} />,
                }}
                childrenNavs={[]}
              />
            </Stack>

            <Text size="xs" c="dimmed" ta="center">
              © Fundacion ADMA V0.2.0
            </Text>
          </Stack>
        </AppShell.Navbar>
        <AppShell.Main>
          <Outlet></Outlet>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default Layout;
