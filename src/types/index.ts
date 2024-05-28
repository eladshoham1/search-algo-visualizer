import Algorithm from '../algorithms/Algorithm';

export type Algorithms = {
    [key: string]: Algorithm;
};

export type MyNavbarProps = {
    currentAlgorithm: string;
    buttonsDisabled: boolean;
    onChangeMaze: (type: string) => void;
    onChangeAlgorithm: (algorithmName: string) => void;
    start: () => void;
    clear: () => void;
}

export enum State {
    Start = 'start',
    Target = 'target',
    Wall = 'wall',
    Space = 'space'
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

export type Orientation = 'horizontal' | 'vertical';

export type ShortestPath = {
    visitedNodesInOrder: NodeType[];
    nodesInShortestPathOrder: NodeType[];
};

export type MazeType = 'simple' | 'random' | 'horizontal' |'vertical';

export type AlgorithmsType = 'BFS' | 'DFS' | 'Astar' | 'Dijkstra';

