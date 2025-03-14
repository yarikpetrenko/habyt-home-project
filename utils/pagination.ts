export const generatePaginationPages = (
  current: number,
  total: number,
  siblings: number,
) => {
  // current = 10
  // siblings = 1
  // total = 20

  // siblins = 1 then totalNumbers = 5
  const totalNumbers = siblings * 2 + 3;
  // totalBlocks = 7
  const totalBlocks = totalNumbers + 2;

  // Show all pages if total is less or equal than 7
  if (total <= totalBlocks) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  // current = 10, so 9 is the max
  const startPage = Math.max(current - siblings, 1);
  // current + siblings = 11, total is 20, so 11 is the minimum
  const endPage = Math.min(current + siblings, total);

  // Array of pages ( considering siblings is 1 )
  const pages = [
    //startPage = 9, so starts with [1,'...']
    ...(startPage > 2 ? [1, -startPage + 1] : startPage === 1 ? [] : [1]),
    ...Array.from(
      // startPage = 9 endPage = 11 then [3 items]
      { length: endPage - startPage + 1 },
      // [9,10,11]
      (_, i) => startPage + i,
    ),
    // total - 1 = 19, and endPage is 11
    ...(endPage < total - 1
      ? // show ['...', 20]
        [-endPage - 1, total]
      : // if endPage is 20, show nothing at the end
        endPage === total
        ? []
        : // show total after all that
          [total]),
  ];

  return pages;
};
