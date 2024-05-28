import React, { useState } from 'react';
import Node from '../Node/Node';
import MyNavbar from '../MyNavbar/MyNavbar';
import Maze from '../../maze/Maze';
import MazeFactory from '../../maze/MazeFactory';
import BreadthFirstSearch from '../../algorithms/BreadthFirstSearch';
import DepthFirstSearch from '../../algorithms/DepthFirstSearch';
import AStar from '../../algorithms/Astar';
import Dijkstra from '../../algorithms/Dijkstra';
import { Algorithms, NodeType } from '../../types';
import './PathfindingVisualizer.css';

const mazeFactory: MazeFactory = new MazeFactory();

const algorithms: Algorithms = {
  'BFS': new BreadthFirstSearch(),
  'DFS': new DepthFirstSearch(),
  'Astar': new AStar(),
  'Dijkstra': new Dijkstra()
};

const PathfindingVisualizer: React.FC = () => {
  const [maze, setMaze] = useState<Maze>();
  const [currentAlgorithmName, setCurrentAlgorithmName] = useState<string>('');
  const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false);

  const onChangeMaze = (type: string): void => {
    setMaze(mazeFactory.createMaze(type));
  }

  const onChangeAlgorithm = (algorithmName: string): void => {
    if (!maze) {
      return;
    }

    maze.setAlgorithm(algorithms[algorithmName]);
    setCurrentAlgorithmName(algorithmName);
  }

  const start = async () => {
    if (!maze) {
      return;
    }

    setButtonsDisabled(true);
    clear();

    try {
      const { visitedNodesInOrder, nodesInShortestPathOrder } = maze.start();
  
      await animateSearch(visitedNodesInOrder, nodesInShortestPathOrder);
    } catch (error) {
      alert(error);
    }

    setButtonsDisabled(false);
  };

  const clear = () => {
    if (!maze) {
      return;
    }

    maze.getGrid().forEach((row: NodeType[]) => {
      row.forEach((node: NodeType) => {
        document.getElementById(`node-${node.point.row}-${node.point.col}`)!.className = `node node-${node.state}`;
      })
    });
  }

  const animateSearch = async (visitedNodesInOrder: NodeType[], nodesInShortestPathOrder: NodeType[]) => {
    for (const node of visitedNodesInOrder) {
      await new Promise((resolve) => setTimeout(resolve, 10));
      document.getElementById(`node-${node.point.row}-${node.point.col}`)!.className = 'node node-visited';
    }
    await animateShortestPath(nodesInShortestPathOrder);
  };

  const animateShortestPath = async (nodesInShortestPathOrder: NodeType[]) => {
    for (const node of nodesInShortestPathOrder) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      document.getElementById(`node-${node.point.row}-${node.point.col}`)!.className = 'node node-shortest-path';
    }
  };

  const renderMaze = () => {
    if (!maze) {
      return <></>;
    }
  
    return maze.getGrid().map((row, rowIndex) => (
      <div key={rowIndex} className='maze-row'>
        {row.map((node, colIndex) => (
          <Node key={`node-${rowIndex}-${colIndex}`} point={node.point} state={node.state} />
        ))}
      </div>
    ));
  };
  
  return (
    <>
      <MyNavbar
        currentAlgorithm={currentAlgorithmName}
        buttonsDisabled={buttonsDisabled}
        onChangeMaze={onChangeMaze}
        onChangeAlgorithm={onChangeAlgorithm}
        start={start}
        clear={clear}
      />
      <div className='maze'>
        {renderMaze()}
      </div>
    </>
  );
};

export default PathfindingVisualizer;
