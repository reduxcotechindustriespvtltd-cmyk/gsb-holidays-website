// Tailwind needs static class names (not interpolated strings) to pick them
// up at build time, so this maps a live package count to one of a few known
// classes instead of a dynamic `lg:grid-cols-${n}` — keeps the grid from
// leaving an awkward empty column when there are fewer than 4 packages.
export function packageGridColsClass(count: number) {
  if (count <= 1) return "lg:grid-cols-1";
  if (count === 2) return "lg:grid-cols-2";
  if (count === 3) return "lg:grid-cols-3";
  return "lg:grid-cols-4";
}
