import { ReactNode } from 'react';
import styles from './nav-links-container.module.css';
import { useNavigate } from 'react-router-dom';
import { NavLink } from '@mantine/core';

class NavLinkClass {
  label!: string;
  goTo?: string;
  icon!: ReactNode;
}

interface props {
  childrenNavs: NavLinkClass[];
  mainNavLink: NavLinkClass;
}

export function NavLinksContainer(props: props) {
  const navigate = useNavigate();
  const mainNavLinkColor = '#7e6c88';
  const childNavLinkColor = '#e6e0ee';
  const navLinkTextColor = '#3e3e3e';

  

  if (props.childrenNavs.length !== 0) {
    const ChildrenNavLinks = () => {
      return props.childrenNavs?.map((nav) => (
        <NavLink
          key={nav.goTo!}
          label={nav.label}
          onClick={() => navigate(nav.goTo!)}
          color={childNavLinkColor}
          variant="filled"
          fw={700}
          active
          style={{ paddingLeft: 50 }}
          c={navLinkTextColor}
          leftSection={nav.icon}
        />
      ));
    };
    return (
      <NavLink
        label={props.mainNavLink.label}
        color={mainNavLinkColor}
        variant="light"
        active
        childrenOffset={0}
        c={navLinkTextColor}
        leftSection={props.mainNavLink.icon}
        fw={700}
        style={{ marginBottom: 0 }}
        
      >
        {<ChildrenNavLinks />}
      </NavLink>
    );
  } else {
    return (
      <NavLink
        label={props.mainNavLink.label}
        color={mainNavLinkColor}
        variant="light"
        active
        childrenOffset={0}
        c={navLinkTextColor}
        leftSection={props.mainNavLink.icon}
        fw={700}
        style={{ marginBottom: 0 }}
        onClick={() => navigate(props.mainNavLink.goTo!)}
      />
    );
  }
}

export default NavLinksContainer;
