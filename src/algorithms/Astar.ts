import { NodeType, State } from "../types";
import SearchAlgorithm from "./SearchAlgorithm";

class AStar extends SearchAlgorithm {
  public override findPath(
    maze: NodeType[][],
    startNode: NodeType,
    targetNode: NodeType
  ): NodeType[] {
    const openSet = [startNode];
    const closedSet: NodeType[] = [];
    startNode.distance = 0;
    startNode.heuristic = this.getHeuristic(startNode, targetNode);

    while (openSet.length > 0) {
      this.sortNodesByHeuristic(openSet);
      const currentNode = openSet.shift()!;

      if (currentNode.state === State.Wall) continue;

      if (currentNode.distance === Infinity) return closedSet;

      currentNode.isVisited = true;
      closedSet.push(currentNode);

      if (currentNode === targetNode) return closedSet;

      this.updateNeighbors(currentNode, maze, targetNode, openSet);
    }

    return closedSet;
  }

  private sortNodesByHeuristic(openSet: NodeType[]): void {
    openSet.sort(
      (nodeA, nodeB) =>
        nodeA.distance + nodeA.heuristic - (nodeB.distance + nodeB.heuristic)
    );
  }

  private updateNeighbors(
    node: NodeType,
    maze: NodeType[][],
    targetNode: NodeType,
    openSet: NodeType[]
  ): void {
    const neighbors = this.getUnvisitedNeighbors(node, maze);
    for (const neighbor of neighbors) {
      const tentativeDistance = node.distance + 1;
      if (tentativeDistance < neighbor.distance) {
        neighbor.distance = tentativeDistance;
        neighbor.heuristic = this.getHeuristic(neighbor, targetNode);
        neighbor.previousNode = node;
        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }
  }

  private getHeuristic(node: NodeType, targetNode: NodeType): number {
    const dx = Math.abs(node.point.col - targetNode.point.col);
    const dy = Math.abs(node.point.row - targetNode.point.row);
    return dx + dy;
  }
}

export default AStar;
