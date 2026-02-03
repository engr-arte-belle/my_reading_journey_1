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

  books.forEach(b => {
    if (!b.endDate) return;

    const date = new Date(b.endDate);
    if (date.getFullYear() !== year) return;

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
    if (!b.endDate) return false;
    return new Date(b.endDate).getFullYear() === year;
  }).length;
}