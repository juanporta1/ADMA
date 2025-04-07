import { useDisclosure } from '@mantine/hooks';
import {
  Accordion,
  AccordionItem,
  AppShell,
  Burger,
  Group,
  NavLink
} from '@mantine/core';
import { Outlet } from 'react-router-dom';
import styles from './layout.module.css';

export function Layout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: { base: 60, md: 70, lg: 80 } }}
      navbar={{
        width: { base: 200, md: 300, lg: 400 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header style={{ backgroundColor: '#a35699', border: 'none' }}>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar style={{ backgroundColor: '#c075b8' }}>
        <Accordion>
          <Accordion.Item
            value="appoinments"
            style={{ borderColor: '#5c3355' }}
          >
            <Accordion.Control className={styles.control}>
              Turnos
            </Accordion.Control>
            <Accordion.Panel>
              {/* <NavLink
                href='/turnos/cargar'
                label= 'Cargar'
                className={styles.navLink}
              /> */}
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="bundles" style={{ borderColor: '#5c3355' }}>
            <Accordion.Control className={styles.control}>
              Legajos
            </Accordion.Control>
            <Accordion.Panel></Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet></Outlet>
      </AppShell.Main>
    </AppShell>
  );
}

export default Layout;
