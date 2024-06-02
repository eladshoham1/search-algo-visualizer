import { State } from "../types";
import { WALLS_DENSITY } from "../constants";
import MazeBuilder from "./MazeBuilder";

class RandomMaze extends MazeBuilder {
  protected override buildWalls(): void {
    const lastPointIndex: number = (this.rows - 1) * (this.cols - 1) - 1;

    for (let i = this.cols + 2; i < lastPointIndex; i++) {
      if (Math.random() < WALLS_DENSITY) {
        const row: number = Math.floor(i / this.cols);
        const col: number = Math.floor(i % this.cols);
        if (this.grid[row][col].state === State.Space) {
          this.grid[row][col].state = State.Wall;
        }
      }
    }
  }
}

export default RandomMaze;
