import HorizontalMaze from './HorizontalWalls';
import Maze from './Maze';
import RandomMaze from './RandomMaze';
import SimpleMaze from './SimpleMaze';
import VerticalMaze from './VerticalWalls';

class MazeFactory {
    public createMaze(type: string): Maze {
        switch (type) {
            case 'simple':
                return new SimpleMaze();
            case 'random':
                return new RandomMaze();
            case 'horizontal':
                return new HorizontalMaze();
            case 'vertical':
                return new VerticalMaze();
            default:
                throw new Error('Invalid maze type');
        }
    }
}

export default MazeFactory;
