
function isValidBoard(columns: number[], row1: number, col1: number): boolean {
  for (let row2 = 0; row2 < row1; row2++) {
    const col2 = columns[row2];

    if (col1 === col2) {
      return false;
    }

    const rowDist = row1 - row2;
    const colDist = Math.abs(col2 - col1);
    if (rowDist === colDist) {
      return false;
    }
  }

  return true;
}

function placeQueens(
  row: number,
  columns: number[],
  boardSize: number,
  results: number[][]
): void {
  if (row === boardSize) {
    results.push([...columns]);
    return;
  }

  for (let col = 0; col < boardSize; col++) {
    if (!isValidBoard(columns, row, col)) {
      continue;
    }

    columns[row] = col;
    placeQueens(row + 1, columns, boardSize, results);
  }
}

export function eightQueens(boardSize = 8): number[][] {
  if (boardSize < 1) {
    return [];
  }

  const results: number[][] = [];
  const columns = new Array(boardSize);

  placeQueens(0, columns, boardSize, results);

  return results;
}
