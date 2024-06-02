import Algorithm from "../algorithms/SearchAlgorithm";

export type Algorithms = {
  [key: string]: Algorithm;
};

export type MyNavbarProps = {
  start: () => void;
  clear: () => void;
};

export enum State {
  Start = "start",
  Target = "target",
  Wall = "wall",
  Space = "space",
}

export type Point = {
  row: number;
  col: number;
};

export type NodeProps = {
  point: Point;
  state: State;
};

export type NodeType = {
  point: Point;
  state: State;
  distance: number;
  isVisited: boolean;
  previousNode: NodeType | null;
  heuristic: number;
};

export type Orientation = "horizontal" | "vertical";

export type ShortestPath = {
  visitedNodesInOrder: NodeType[];
  shortestPath: NodeType[];
};

export type MazeType = "Simple" | "Random" | "Horizontal" | "Vertical";

export type AlgorithmsType = "BFS" | "Astar" | "Dijkstra";
