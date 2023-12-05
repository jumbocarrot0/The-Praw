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
  NavbarText,
  DropdownMenu,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem
} from 'reactstrap';

// navigation links
export default function PrawNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar className="navbar navbar-expand-md bg-light" data-bs-theme="light" fixed="top">
      <NavbarBrand tag="span">The Praw</NavbarBrand>
      <NavbarToggler onClick={toggle} className="bg-dark">
      </NavbarToggler>
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem key={0}>
            <Link className="nav-link" to="/">
              Home
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
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Tools
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>
                <Link className="nav-link" to="/Combos">
                  Combo Generator
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link className="nav-link" to="/Selection">
                  Alien Dealer
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link className="nav-link" to="/Geek">
                  Geek Practice
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link className="nav-link" to="/DigitalDial">
                  Digital Dial
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <NavItem key={6}>
            <Link className="nav-link" to="/HouseRules">
              House Rules
            </Link>
          </NavItem>
          <NavItem key={4}>
            <Link className="nav-link" to="https://github.com/jumbocarrot0/The-Praw" target="_blank" rel="external">
              GitHub
            </Link>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}
