import { NodeType, State } from "../types";
import SearchAlgorithm from "./SearchAlgorithm";

class BreadthFirstSearch extends SearchAlgorithm {
  public override findPath(
    maze: NodeType[][],
    startNode: NodeType,
    targetNode: NodeType
  ): NodeType[] {
    const queue: NodeType[] = [];
    const visitedNodesInOrder: NodeType[] = [];

    queue.push(startNode);

    while (queue.length > 0) {
      const currentNode = queue.shift();
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
          queue.push(neighbor);
        }
      }
    }

    return visitedNodesInOrder;
  }
}

export default BreadthFirstSearch;
