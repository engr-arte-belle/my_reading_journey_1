export function totalBooks(books) {
  return books.length;
}

export function totalPages(books) {
  return books.reduce((sum, b) => sum + b.pages, 0);
}

export function averageRating(books) {
  const rated = books.filter(b => b.rating);
  if (rated.length === 0) return 0;
  return (
    rated.reduce((sum, b) => sum + b.rating, 0) / rated.length
  ).toFixed(2);
}

export function booksPerMonth(books, year) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const result = Object.fromEntries(months.map(m => [m, 0]));

  // const selectedYear = year === "all" ? "all" : Number(year)  // ensure year is converted to number when it's not "all"

  books.forEach(b => {
    if (!b.endDate) return;

    const date = new Date(b.endDate);

    if (year !== "all" && date.getFullYear() !== Number(year)) return;

    const month = date.toLocaleString("en", { month: "short" });
    // result[month] = (result[month] || 0) + 1;
    result[month]++;
  });

  // return Object.entries(result).map(([month, books]) => ({
  //   month,
  //   books
  // }));
  return months.map(m => ({
    month: m,
    books: result[m]
  }));
}

export function totalBooksByYear(books, year) {
  return books.filter(b => {
    if (!b.endDate) return false; // only finished books (endDate) are counted
    if (year === "all") return true;

    return new Date(b.endDate).getFullYear() === Number(year);
  }).length;
}

export function totalPagesByYear(books, year) {
  return books.filter(b => {
    if (!b.endDate) return false; // only finished books (endDate) are counted
    if (year === "all") return true;

    return new Date(b.endDate).getFullYear() === Number(year);
  }).reduce((sum, b) => sum + b.pages, 0);
}

export function averageRatingByYear(books, year) {
  const rated = books.filter(b => {
    if (!b.endDate) return false; // only finished books (endDate) are counted
    if (b.rating == null || isNaN(Number(b.rating))) return false; // only rated books
    if (year === "all") return true;

    return new Date(b.endDate).getFullYear() === Number(year);
  });

  if (rated.length === 0) return 0;

  return (
    rated.reduce((sum, b) => sum + Number(b.rating), 0) / rated.length
  ).toFixed(2);
}

export function totalAuthorsByYear(books, year) {
  return new Set(
    books.filter(b => {
      if (!b.endDate) return false; // only finished books (endDate) are counted
      if (year === "all") return true;
      if (!b.author) return false;  // only known authors are counted

      return new Date(b.endDate).getFullYear() === Number(year);
    }).map(b => b.author.trim())
  ).size;
}