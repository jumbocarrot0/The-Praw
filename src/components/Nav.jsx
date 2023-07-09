import { useState } from "react";
import { Link } from "react-router-dom"

// Reactstrap
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  // NavLink,
  NavbarText
} from 'reactstrap';

// navigation links
export default function PrawNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar className="navbar navbar-expand-md bg-light" data-bs-theme="light" fixed="top">
      <NavbarBrand>The Praw</NavbarBrand>
      <NavbarToggler onClick={toggle} className="bg-dark">
        </NavbarToggler>
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem key={0}>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </NavItem>
          <NavItem key={1}>
            <Link className="nav-link" to="/Combos">
              Combos
            </Link>
          </NavItem>
          <NavItem key={2}>
            <Link className="nav-link" to="/Aliens">
              Aliens
            </Link>
          </NavItem>
          <NavItem key={3}>
            <Link className="nav-link" to="/Variants">
              Variants
            </Link>
          </NavItem>
          <NavItem key={5}>
            <Link className="nav-link" to="/Selection">
              Selection
            </Link>
          </NavItem>
          <NavItem key={4}>
            <Link className="nav-link" to="https://github.com/jumbocarrot0/The-Praw" target="_blank" rel="external">
              GitHub
            </Link>
          </NavItem>
        </Nav>
        <NavbarText>Powered by React</NavbarText>
      </Collapse>
    </Navbar>
  );
}
