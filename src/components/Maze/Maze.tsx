import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyNavbar from "../MyNavbar/MyNavbar";
import Node from "../Node/Node";
import MazeBuilder from "../../maze/MazeBuilder";
import SearchAlgorithm from "../../algorithms/SearchAlgorithm";
import { AppDispatch, RootState } from "../../state/store";
import { NodeType, ShortestPath } from "../../types";
import "./Maze.css";
import { setDisableButtons } from "../../state/maze/mazeBuilderSlice";

const Maze: React.FC = () => {
  const mazeBuilder: MazeBuilder = useSelector(
    (state: RootState) => state.mazeBuilder.value
  );
  const searchAlgorithm: SearchAlgorithm = useSelector(
    (state: RootState) => state.searchAlgorithm.value
  );
  const dispatch = useDispatch<AppDispatch>();

  const clear = useCallback(() => {
    mazeBuilder.getGrid().forEach((row: NodeType[], rowIndex: number) => {
      row.forEach((node: NodeType, colIndex: number) => {
        document.getElementById(
          `node-${node.point.row}-${node.point.col}`
        )!.className = `node node-${node.state}`;
      });
    });
  }, [mazeBuilder]);

  useEffect(() => {
    clear();
  }, [mazeBuilder, clear]);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const animateNodes = async (
    nodes: NodeType[],
    className: string,
    delay: number
  ) => {
    for (const node of nodes.slice(1, nodes.length - 1)) {
      await sleep(delay);
      document.getElementById(
        `node-${node.point.row}-${node.point.col}`
      )!.className = className;
    }
  };

  const animateSearch = async (shortestPath: ShortestPath) => {
    await animateNodes(
      shortestPath.visitedNodesInOrder,
      "node node-visited",
      10
    );
    await animateNodes(
      shortestPath.shortestPath,
      "node node-shortest-path",
      50
    );
  };

  const start = async () => {
    dispatch(setDisableButtons(true));
    await animateSearch(mazeBuilder.findPath(searchAlgorithm));
    dispatch(setDisableButtons(false));
  };

  function renderMaze() {
    return mazeBuilder.getGrid().map((row, rowIndex) => (
      <div key={rowIndex} className="maze-row">
        {row.map((node, colIndex) => (
          <Node
            key={`node-${rowIndex}-${colIndex}`}
            point={node.point}
            state={node.state}
          />
        ))}
      </div>
    ));
  }

  return (
    <>
      <MyNavbar start={start} clear={clear} />
      <div className="maze">{renderMaze()}</div>
    </>
  );
};

export default Maze;
