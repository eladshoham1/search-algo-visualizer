import { NodeType, State } from "../types";
import SearchAlgorithm from "./SearchAlgorithm";

class Dijkstra extends SearchAlgorithm {
  public override findPath(
    maze: NodeType[][],
    startNode: NodeType,
    targetNode: NodeType
  ): NodeType[] {
    const visitedNodesInOrder: NodeType[] = [];
    startNode.distance = 0;
    const unvisitedNodes = this.getAllNodes(maze);
    while (unvisitedNodes.length) {
      this.sortNodesByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();
      if (!closestNode) break;
      if (closestNode.state === State.Wall) continue;
      if (closestNode.distance === Infinity) return visitedNodesInOrder;
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);
      if (closestNode === targetNode) return visitedNodesInOrder;
      this.updateUnvisitedNeighbors(closestNode, maze);
    }
    return visitedNodesInOrder;
  }

  private sortNodesByDistance(unvisitedNodes: NodeType[]): void {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }

  private updateUnvisitedNeighbors(node: NodeType, maze: NodeType[][]): void {
    const unvisitedNeighbors = this.getUnvisitedNeighbors(node, maze);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
  }

  private getAllNodes(maze: NodeType[][]): NodeType[] {
    const nodes: NodeType[] = [];
    for (const row of maze) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  }
}

export default Dijkstra;
