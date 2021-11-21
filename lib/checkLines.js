const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function linesThatAre(a, b, c, squares) {
  return lines.filter((squareIndexes) => {
    const squareValues = squareIndexes.map((index) => squares[index]);
    return JSON.stringify([a, b, c].sort()) === JSON.stringify(squareValues.sort());
  });
}

export default linesThatAre;
