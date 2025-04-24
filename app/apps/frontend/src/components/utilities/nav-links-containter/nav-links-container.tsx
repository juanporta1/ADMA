// Componente para renderizar un menú de navegación lateral con enlaces principales y secundarios
import { ReactNode, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavLink } from '@mantine/core';
import { NavLinkContext } from '../../../contexts/nav-link.context';

// Clase para definir la estructura de un enlace de navegación
class NavLinkClass {
  label!: string;
  goTo!: string;
  icon!: ReactNode;
}

interface props {
  childrenNavs: NavLinkClass[];
  mainNavLink: NavLinkClass;
}

// Renderiza el contenedor de enlaces de navegación
export function NavLinksContainer(props: props) {
  const navigate = useNavigate();
  const mainNavLinkColor = '#7e6c88';
  const childNavLinkColor = '#e6e0ee';
  const inChildColor = '#d2c7dc';
  const inMainColor = '#9989a4';
  const navLinkTextColor = '#3e3e3e';
  const location = useLocation();
  const [isInMain, setIsInMain] = useState(false);
  const { navLink, setNavLink } = useContext(NavLinkContext);
  useEffect(() => {
    setIsInMain(navLink === props.mainNavLink.label);
  }, [navLink]);
  // Si hay enlaces secundarios, los renderiza como hijos del principal
  if (props.childrenNavs.length !== 0) {
    const ChildrenNavLinks = () => {
      return props.childrenNavs?.map((nav) => {
        const isInChild = location.pathname === nav.goTo;

        return (
          <NavLink
            key={nav.goTo!}
            label={nav.label}
            onClick={() => {
              navigate(nav.goTo!);
            }}
            color={isInChild ? inChildColor : childNavLinkColor}
            variant="filled"
            fw={700}
            active
            style={{ paddingLeft: 50 }}
            c={navLinkTextColor}
            leftSection={nav.icon}
          />
        );
      });
    };
    return (
      <NavLink
        label={props.mainNavLink.label}
        color={isInMain ? mainNavLinkColor : inMainColor}
        variant="filled"
        active
        childrenOffset={0}
        c={navLinkTextColor}
        leftSection={props.mainNavLink.icon}
        fw={700}
        style={{ marginBottom: 0 }}
        onClick={() => {
          if(navLink === props.mainNavLink.label)
            setNavLink?.("");
          else
            setNavLink?.(props.mainNavLink.label);
        }}
      >
        {<ChildrenNavLinks />}
      </NavLink>
    );
  } else {
    // Si no hay secundarios, solo el principal
    return (
      <NavLink
        label={props.mainNavLink.label}
        color={isInMain ? mainNavLinkColor : inMainColor}
        variant="filled"
        active
        childrenOffset={0}
        c={navLinkTextColor}
        leftSection={props.mainNavLink.icon}
        fw={700}
        style={{ marginBottom: 0 }}
        onClick={() => {
          navigate(props.mainNavLink.goTo);
          setNavLink?.(props.mainNavLink.label);
        }}
      />
    );
  }
}

export default NavLinksContainer;
