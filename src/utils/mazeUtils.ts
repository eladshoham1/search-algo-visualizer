import { Point } from '../types';

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * @param min Minimum integer value
 * @param max Maximum integer value
 */
export function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random point within the specified bounds.
 * @param minRow - Minimum row value.
 * @param minCol - Minimum column value.
 * @param maxRow - Maximum row value.
 * @param maxCol - Maximum column value.
 * @returns A random point within the specified bounds.
 */
export function getRandomPoint(minRow: number, minCol: number, maxRow: number, maxCol: number): Point {
    const row: number = getRandomInt(minRow, maxRow);
    const col: number = getRandomInt(minCol, maxCol);
    return { row, col };
}
