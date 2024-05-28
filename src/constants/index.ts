import { AlgorithmsType, MazeType } from '../types';

export const ROWS: number = 30;
export const COLS: number = 70;
export const WALLS_DENSITY: number = 0.2;

export const mazeTypes: MazeType[] = ['simple', 'random', 'horizontal', 'vertical'];
export const algorithmsTypes: AlgorithmsType[] = ['BFS', 'DFS', 'Astar', 'Dijkstra'];
