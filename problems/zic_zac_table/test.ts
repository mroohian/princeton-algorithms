const { args } = Deno;

const rows = parseInt(args[0] ?? "4", 10);
const cols = parseInt(args[1] ?? "5", 10);

for (let r = 0; r < rows; r++) {
  const rowValues = new Array(cols);
  for (let c = 0; c < cols; c++) {
    rowValues[c] = rows * c + (c % 2 === 0 ? r + 1 : rows - r);
  }

  console.log(rowValues);
}
