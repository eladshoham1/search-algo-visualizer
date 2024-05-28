import React from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { MyNavbarProps } from '../../types';
import './MyNavbar.css';
import { algorithmsTypes, mazeTypes } from '../../constants';

const MyNavbar: React.FC<MyNavbarProps> = ({ currentAlgorithm, buttonsDisabled, onChangeMaze, onChangeAlgorithm, start, clear }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar-custom">
      <Navbar.Brand href="#home" className="navbar-brand-custom">Search Algorithms</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Maze" id="basic-nav-dropdown1" disabled={buttonsDisabled}>
            {mazeTypes.map((type: string) => (
              <NavDropdown.Item key={type} onClick={() => onChangeMaze(type)}>
                {type}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
          <NavDropdown title="Algorithm" id="basic-nav-dropdown2" disabled={buttonsDisabled}>
            {algorithmsTypes.map((algorithm: string) => (
              <NavDropdown.Item key={algorithm} onClick={() => onChangeAlgorithm(algorithm)}>
                {algorithm}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      <div className="button-group">
        <Button variant="outline-light" onClick={clear} disabled={buttonsDisabled}>Clear Maze</Button>
        <Button variant="outline-light" onClick={start} disabled={buttonsDisabled}>Start {currentAlgorithm}</Button>
      </div>
    </Navbar>
  );
};

export default MyNavbar;
