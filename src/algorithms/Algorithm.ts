import { NodeType } from '../types';

abstract class Algorithm {
  public abstract findPath(maze: NodeType[][], startNode: NodeType, targetNode: NodeType): NodeType[];

  public getNodesInShortestPathOrder(targetNode: NodeType): NodeType[] {
    const nodesInShortestPathOrder: NodeType[] = [];
    let currentNode: NodeType | null = targetNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }

  protected getUnvisitedNeighbors(node: NodeType, maze: NodeType[][]): NodeType[] {
    const neighbors: NodeType[] = [];
    const { col, row } = node.point;
    if (row > 0) neighbors.push(maze[row - 1][col]);
    if (row < maze.length - 1) neighbors.push(maze[row + 1][col]);
    if (col > 0) neighbors.push(maze[row][col - 1]);
    if (col < maze[row].length - 1) neighbors.push(maze[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
  }
}

export default Algorithm;
