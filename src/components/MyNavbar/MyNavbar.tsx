import React from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Algorithms, MyNavbarProps } from "../../types";
import "./MyNavbar.css";
import { algorithmsTypes, mazeTypes } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import BreadthFirstSearch from "../../algorithms/BreadthFirstSearch";
import AStar from "../../algorithms/Astar";
import Dijkstra from "../../algorithms/Dijkstra";
import { setMazeBuilder } from "../../state/maze/mazeBuilderSlice";
import { setSearchAlgorithm } from "../../state/algorithm/searchAlgorithmSlice";
import SearchAlgorithm from "../../algorithms/SearchAlgorithm";

const algorithms: Algorithms = {
  BFS: new BreadthFirstSearch(),
  Astar: new AStar(),
  Dijkstra: new Dijkstra(),
};

const MyNavbar: React.FC<MyNavbarProps> = ({ start, clear }) => {
  const disableButtons: boolean = useSelector(
    (state: RootState) => state.mazeBuilder.disableButtons
  );
  const searchAlgorithm: SearchAlgorithm = useSelector(
    (state: RootState) => state.searchAlgorithm.value
  );
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar-custom">
      <Navbar.Brand href="#home" className="navbar-brand-custom">
        Search Algorithms
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown
            title="Maze"
            id="basic-nav-dropdown1"
            disabled={disableButtons}
          >
            {mazeTypes.map((type: string) => (
              <NavDropdown.Item
                key={type}
                onClick={() => dispatch(setMazeBuilder(type))}
              >
                {type}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
          <NavDropdown
            title="Algorithm"
            id="basic-nav-dropdown2"
            disabled={disableButtons}
          >
            {algorithmsTypes.map((algorithm: string) => (
              <NavDropdown.Item
                key={algorithm}
                onClick={() =>
                  dispatch(setSearchAlgorithm(algorithms[algorithm]))
                }
              >
                {algorithm}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      <div className="button-group">
        <Button
          variant="outline-light"
          onClick={clear}
          disabled={disableButtons}
        >
          Clear Maze
        </Button>
        <Button
          variant="outline-light"
          onClick={start}
          disabled={disableButtons}
        >
          Start {searchAlgorithm.constructor.name}
        </Button>
      </div>
    </Navbar>
  );
};

export default MyNavbar;
