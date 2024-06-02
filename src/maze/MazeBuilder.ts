import SearchAlgorithm from "../algorithms/SearchAlgorithm";
import { NodeType, Point, ShortestPath, State } from "../types";
import { getRandomPoint } from "../utils/mazeUtils";

class MazeBuilder {
  protected readonly rows: number;
  protected readonly cols: number;
  protected grid: NodeType[][];
  protected startPoint: Point;
  protected targetPoint: Point;

  public constructor(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;
    this.grid = Array.from({ length: rows }, () => Array<NodeType>(cols));
    this.initialGrid();
    this.startPoint = this.generatePoint(State.Start);
    this.targetPoint = this.generatePoint(State.Target);
    this.buildWalls();
  }

  public getGrid(): NodeType[][] {
    return this.grid;
  }

  public getStartPoint(): Point {
    return this.startPoint;
  }

  public getTargetPoint(): Point {
    return this.targetPoint;
  }

  public findPath(searchAlgorithm: SearchAlgorithm): ShortestPath {
    const startNode: NodeType =
      this.grid[this.startPoint.row][this.startPoint.col];
    const targetNode: NodeType =
      this.grid[this.targetPoint.row][this.targetPoint.col];

    return {
      visitedNodesInOrder: searchAlgorithm.findPath(
        this.grid,
        startNode,
        targetNode
      ),
      shortestPath: searchAlgorithm.getShortestPath(targetNode),
    };
  }

  protected buildWalls(): void {}

  private initialGrid(): void {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.grid[row][col] = {
          point: { row, col },
          state: this.isBorder(row, col) ? State.Wall : State.Space,
          distance: Infinity,
          isVisited: false,
          previousNode: null,
          heuristic: 0,
        };
      }
    }
  }

  private isBorder(row: number, col: number): boolean {
    return (
      row === 0 || row === this.rows - 1 || col === 0 || col === this.cols - 1
    );
  }

  private isPointWithinBounds(point: Point): boolean {
    return (
      point.row > 0 &&
      point.row < this.rows - 1 &&
      point.col > 0 &&
      point.col < this.cols - 1
    );
  }

  private generatePoint(state: State): Point {
    let point: Point;
    do {
      point = getRandomPoint(1, 1, this.rows - 2, this.cols - 2);
    } while (!this.setPoint(point, state));
    return point;
  }

  private setPoint(point: Point, state: State): boolean {
    if (
      !this.isPointWithinBounds(point) ||
      this.grid[point.row][point.col].state !== State.Space
    ) {
      return false;
    }

    this.grid[point.row][point.col].state = state;
    return true;
  }
}

export default MazeBuilder;
