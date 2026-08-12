// Always 3 columns, regardless of how many packages there are — a lone
// package should sit at one card-width, not stretch to fill the row.
export function packageGridColsClass() {
  return "lg:grid-cols-3";
}
