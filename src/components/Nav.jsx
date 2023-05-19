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
  NavLink,
  NavbarText
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
            <Link className="nav-link" to="/">
              Home
            </Link>
          </NavItem>
          <NavItem>
            <Link className="nav-link" to="/Combos">
              Combos
            </Link>
          </NavItem>
          <NavItem>
            <Link className="nav-link" to="/Aliens">
              Aliens
            </Link>
          </NavItem>
          <NavItem>
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
