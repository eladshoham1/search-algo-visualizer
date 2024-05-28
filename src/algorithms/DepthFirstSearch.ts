import { NodeType, State } from '../types';
import Algorithm from './Algorithm';

class DepthFirstSearch extends Algorithm {
  public override findPath(maze: NodeType[][], startNode: NodeType, targetNode: NodeType): NodeType[] {
    const stack: NodeType[] = [];
    const visitedNodesInOrder: NodeType[] = [];

    stack.push(startNode);

    while (stack.length > 0) {
      const currentNode = stack.pop();
      if (!currentNode) continue;
      if (currentNode.state === State.Wall) continue;
      if (currentNode.isVisited) continue;

      currentNode.isVisited = true;
      visitedNodesInOrder.push(currentNode);

      if (currentNode === targetNode) return visitedNodesInOrder;

      const unvisitedNeighbors = this.getUnvisitedNeighbors(currentNode, maze);
      for (const neighbor of unvisitedNeighbors) {
        if (!neighbor.isVisited) {
          neighbor.previousNode = currentNode;
          stack.push(neighbor);
        }
      }
    }

    return visitedNodesInOrder;
  }
}

export default DepthFirstSearch;
