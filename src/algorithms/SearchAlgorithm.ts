import { NodeType } from "../types";

abstract class SearchAlgorithm {
  public abstract findPath(
    maze: NodeType[][],
    startNode: NodeType,
    targetNode: NodeType
  ): NodeType[];

  public getShortestPath(targetNode: NodeType): NodeType[] {
    const shortestPath: NodeType[] = [];
    let currentNode: NodeType | null = targetNode;
    while (currentNode !== null) {
      shortestPath.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return shortestPath;
  }

  protected getUnvisitedNeighbors(
    node: NodeType,
    maze: NodeType[][]
  ): NodeType[] {
    const neighbors: NodeType[] = [];
    const { col, row } = node.point;

    const directions = [
      { rowOffset: -1, colOffset: 0 }, // Up
      { rowOffset: 1, colOffset: 0 }, // Down
      { rowOffset: 0, colOffset: -1 }, // Left
      { rowOffset: 0, colOffset: 1 }, // Right
    ];

    for (const { rowOffset, colOffset } of directions) {
      const newRow = row + rowOffset;
      const newCol = col + colOffset;

      if (
        newRow >= 0 &&
        newRow < maze.length &&
        newCol >= 0 &&
        newCol < maze[newRow].length &&
        !maze[newRow][newCol].isVisited
      ) {
        neighbors.push(maze[newRow][newCol]);
      }
    }

    return neighbors;
  }
}

export default SearchAlgorithm;
