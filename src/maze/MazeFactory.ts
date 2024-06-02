import MazeBuilder from "./MazeBuilder";
import RandomMaze from "./RandomMaze";
import HorizontalMaze from "./HorizontalMaze";
import VerticalMaze from "./VerticalMaze";
import { COLS, ROWS } from "../constants";

class MazeFactory {
  private static instance: MazeFactory | null = null;

  private constructor() {}

  public static getInstance(): MazeFactory {
    if (!MazeFactory.instance) {
      MazeFactory.instance = new MazeFactory();
    }
    return MazeFactory.instance;
  }

  public createMaze(
    type: string,
    rows: number = ROWS,
    cols: number = COLS
  ): MazeBuilder {
    const mazeTypes: {
      [key: string]: new (rows: number, cols: number) => MazeBuilder;
    } = {
      Simple: MazeBuilder,
      Random: RandomMaze,
      Horizontal: HorizontalMaze,
      Vertical: VerticalMaze,
    };

    const MazeClass = mazeTypes[type];
    if (!MazeClass) {
      throw new Error(`${type} is not one of the maze types`);
    }
    return new MazeClass(rows, cols);
  }
}

export default MazeFactory;
