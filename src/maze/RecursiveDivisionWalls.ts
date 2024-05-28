import { Orientation, State } from '../types';
import { getRandomInt } from '../utils/mazeUtils';
import Maze from './Maze';

abstract class RecursiveDivisionWalls extends Maze {
    protected recursiveDivision(
        minRow: number, 
        maxRow: number, 
        minCol: number, 
        maxCol: number, 
        orientation: Orientation
    ): void {
        if (orientation === 'horizontal') {
            this.divideHorizontally(minRow, maxRow, minCol, maxCol);
        } else {
            this.divideVertically(minRow, maxRow, minCol, maxCol);
        }
    }

    private divideHorizontally(minRow: number, maxRow: number, minCol: number, maxCol: number): void {
        if (maxRow - minRow < 2) return;
        const row = getRandomInt(minRow + 1, maxRow - 1);
        for (let col = minCol; col < maxCol; col++) {
            this.grid[row][col].state = State.Wall;
        }
        this.recursiveDivision(minRow, row - 1, minCol, maxCol, 'vertical');
        this.recursiveDivision(row + 1, maxRow, minCol, maxCol, 'vertical');
    }

    private divideVertically(minRow: number, maxRow: number, minCol: number, maxCol: number): void {
        if (maxCol - minCol < 2) return;
        const col = getRandomInt(minCol + 1, maxCol - 1);
        for (let row = minRow; row < maxRow; row++) {
            this.grid[row][col].state = State.Wall;
        }
        this.recursiveDivision(minRow, maxRow, minCol, col - 1, 'horizontal');
        this.recursiveDivision(minRow, maxRow, col + 1, maxCol, 'horizontal');
    }
}

export default RecursiveDivisionWalls;
