import { useState } from "react";
import {Link} from "react-router-dom"

// Reactstrap
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from 'reactstrap';

// navigation links
export default function PrawNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar className="navbar navbar-expand-md mb-5 bg-light" data-bs-theme="light">
      <NavbarBrand>The Praw</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink href="/">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/Combos">
              Combos
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/Aliens">
              Aliens
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/jumbocarrot0/jumbocarrot0.github.io" target="_blank" rel="external">
              GitHub
            </NavLink>
          </NavItem>
        </Nav>
        <NavbarText>Powered by React</NavbarText>
      </Collapse>
    </Navbar>
  );
}
