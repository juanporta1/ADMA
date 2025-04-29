import { useDisclosure } from '@mantine/hooks';
import {
  AppShell,
  Avatar,
  Box,
  Burger,
  Flex,
  Group,
  Image,
  Indicator,
  MantineProvider,
  Stack,
  Text,
} from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faGear,
  faCalendarCheck,
  faFilter,
  faArrowUpFromBracket,
  faTableList,
  faUserDoctor,
} from '@fortawesome/free-solid-svg-icons';
import NavLinksContainer from '../utilities/nav-links-containter/nav-links-container';
import { useAuth } from 'react-oidc-context';
import UserMenu from './user-menu/user-menu';
export function Layout() {
  const [opened, { toggle }] = useDisclosure();
  const auth = useAuth();
  return (
    <MantineProvider>
      <AppShell
        header={{ height: { base: 60, md: 70, lg: 80 } }}
        navbar={{
          width: { base: 100, md: 150, lg: 200 },
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        style={{ height: "100vh" }}
        padding="md"
      >
        <AppShell.Header style={{ backgroundColor: '#8b7a9a', border: 'none' }}>
          <Flex direction={'row'} justify={'space-between'} h={'100%'}>
            <Group h="100%" px="md">
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
                style={{ marginRight: '10px' }}
              />
              <img
                src={
                  'https://altagracia.gob.ar//wp-content/uploads/2022/11/SALUD_ANIMAL_LOGO-removebg-preview.png'
                }
                
                style={{
                  height: '100%',

                }}
              />
              <img
                src="https://altagracia.gob.ar/wp-content/uploads/2022/05/cropped-logo_alta_gracia_muni.png"
                alt=""
                style={{
                  height: '60%',
                }}
              />
            </Group>

            <Flex
              direction={'row'}
              gap={'md'}
              justify={'center'}
              align={'center'}
              h={'100%'}
              p={'sm'}
            >
              <Text c={'white'} fw={700}>
                {auth.user?.profile.email}
              </Text>
              <UserMenu />
            </Flex>
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
              <NavLinksContainer
                mainNavLink={{
                  goTo: '/planilla-de-ingreso',
                  label: 'Planilla de ingreso',
                  icon: <FontAwesomeIcon icon={faTableList} />,
                }}
                childrenNavs={[]}
              />
              <NavLinksContainer
                mainNavLink={{
                  goTo: '/castraciones',
                  label: 'Castraciones',
                  icon: <FontAwesomeIcon icon={faUserDoctor} />,
                }}
                childrenNavs={[]}
              />

              <Text size="md" fw={700} tt="uppercase" c="dimmed" p="xs">
                Ajustes
              </Text>
              <NavLinksContainer
                mainNavLink={{
                  goTo: '/configuracion',
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
        <AppShell.Main h={"100%"} w={"100%"}>
          
            <Outlet />
          
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default Layout;
