import RecursiveDivisionWalls from './RecursiveDivisionWalls';

class HorizontalMaze extends RecursiveDivisionWalls {
    public override buildWalls(): void {
        this.recursiveDivision(1, this.rows - 2, 1, this.cols - 2, 'horizontal');
    }
}

export default HorizontalMaze;
