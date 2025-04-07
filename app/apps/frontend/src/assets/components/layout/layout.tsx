import { useDisclosure } from '@mantine/hooks';
import {
  Accordion,
  AppShell,
  Burger,
  Center,
  createTheme,
  Group,
  MantineProvider,
  NavLink,
  Text,
} from '@mantine/core';
import { Outlet } from 'react-router-dom';
import styles from './layout.module.css';

export function Layout() {
  const [opened, { toggle }] = useDisclosure();
  const theme = createTheme({
    components: {
      Accordion: Accordion.extend({
        classNames: {
          control: styles.control,
        },
      }),
    },
  });

  return (
    <MantineProvider theme={theme}>
      <AppShell
        header={{ height: { base: 60, md: 70, lg: 80 } }}
        navbar={{
          width: { base: 200, md: 300, lg: 400 },
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header style={{ backgroundColor: '#66355d', border: 'none' }}>
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            
          </Group>
        </AppShell.Header>
        <AppShell.Navbar style={{ backgroundColor: '#d195cc' }}>
          <NavLink
            label="Turnos"
            childrenOffset={0}
            color="#793b6d"
            variant="filled"
            active
          >
            <NavLink
              label="Cargar"
              href="/turnos/cargar"
              color="#aa589d"
              variant="filled"
              active
            />
            <NavLink
              label="Filtrar"
              href="/turnos/filtrar"
              color="#aa589d"
              variant="filled"
              active
            />
          </NavLink>
          <NavLink
            label="Legajos"
            childrenOffset={0}
            color="#793b6d"
            variant="filled"
            active
          >
            <NavLink
              label="Cargar"
              href="/turnos/cargar"
              color="#aa589d"
              variant="filled"
              active
            />
            <NavLink
              label="Filtrar"
              href="/turnos/filtrar"
              color="#aa589d"
              variant="filled"
              active
            />
          </NavLink>
        </AppShell.Navbar>
        <AppShell.Main>
          <Outlet></Outlet>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default Layout;
