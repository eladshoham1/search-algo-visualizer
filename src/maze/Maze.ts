import Algorithm from '../algorithms/Algorithm';
import { COLS, ROWS } from '../constants';
import { NodeType, Point, ShortestPath, State } from '../types';
import { getRandomPoint } from '../utils/mazeUtils';

abstract class Maze {
    protected grid!: NodeType[][];
    protected readonly rows: number;
    protected readonly cols: number;
    protected startNode!: NodeType;
    protected targetNode!: NodeType;
    protected algorithm!: Algorithm | null;

    public constructor(rows: number = ROWS, cols: number = COLS, algorithm: Algorithm | null = null) {
        this.rows = rows;
        this.cols = cols;
        this.setAlgorithm(algorithm);
        this.initializeGrid();
        this.buildWalls();
        this.setStartNode();
        this.setTargetNode();
    }

    public getGrid(): NodeType[][] {
        return this.grid;
    }

    public getStartNode(): NodeType {
        return this.startNode;
    }

    public getTargetNode(): NodeType {
        return this.targetNode;
    }

    public getAlgorithm(): Algorithm | null {
        return this.algorithm;
    }

    public setAlgorithm(algorithm: Algorithm | null) {
        this.algorithm = algorithm;
    }

    public start(): ShortestPath {
        if (!this.algorithm) {
            throw new Error('You must select algorithm');
        }

        if (!this.startNode || !this.targetNode) {
            throw new Error('Maze went into problem in setting the start and target points, please try another maze');
        }
    
        const visitedNodesInOrder: NodeType[] = this.algorithm.findPath(this.grid, this.startNode, this.targetNode);
        const nodesInShortestPathOrder: NodeType[] = this.algorithm.getNodesInShortestPathOrder(this.targetNode);
        return { visitedNodesInOrder, nodesInShortestPathOrder };
    }
    
    public abstract buildWalls(): void;
    
    private initializeGrid(): void {
        this.grid = Array.from({ length: this.rows }, (_, row: number): NodeType[] => 
            Array.from({ length: this.cols }, (_, col: number): NodeType => ({
                point: { row, col },
                state: this.isBorder(row, col) ? State.Wall : State.Space,
                distance: Infinity,
                isVisited: false,
                previousNode: null,
                heuristic: 0
            }))
        );
    }

    private isBorder(row: number, col: number): boolean {
        return row === 0 || row === this.rows - 1 || col === 0 || col === this.cols - 1;
    } 

    private setStartNode(): void {
        let point: Point;
        do {
            point = getRandomPoint(1, 1, this.rows - 2, this.cols - 2);
        } while (this.grid[point.row][point.col].state !== State.Space);
        this.grid[point.row][point.col].state = State.Start;
        this.startNode = this.grid[point.row][point.col];
    }

    private setTargetNode(): void {
        let point: Point;
        do {
            point = getRandomPoint(1, 1, this.rows - 2, this.cols - 2);
        } while (this.grid[point.row][point.col].state !== State.Space);
        this.grid[point.row][point.col].state = State.Target;
        this.targetNode = this.grid[point.row][point.col];
    }
}

export default Maze;
