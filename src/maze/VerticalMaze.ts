import RecursiveDivisionMaze from "./RecursiveDivisionMaze";

class VerticalMaze extends RecursiveDivisionMaze {
  public override buildWalls(): void {
    this.recursiveDivision(1, this.rows - 2, 1, this.cols - 2, "vertical");
  }
}

export default VerticalMaze;
