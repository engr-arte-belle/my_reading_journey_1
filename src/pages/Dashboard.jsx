// import books from "../data/books.json";
import { useContext } from "react";
import { BooksContext } from "../context/BooksContext";

import { totalBooks, totalPages, averageRating, totalBooksByYear } from "../utils/analytics";
import SummaryCard from "../components/SummaryCard";

import { booksPerMonth } from "../utils/analytics";
import BooksPerMonthChart from "../components/BooksPerMonthChart";
import { useState, useMemo } from "react";

import GoalProgress from "../components/GoalProgress";

export default function Dashboard() {
  const { books } = useContext(BooksContext);

  const goal = 52; // later load from settings
  // const year = 2026;
  const [year, setYear] = useState(new Date().getFullYear());

  const years = useMemo(() => {
    return [...new Set(
      books.filter(b => b.endDate).map(b => new Date(b.endDate).getFullYear())
    )].sort((a, b) => b - a);
  }, [books]);

  // const chartData = booksPerMonth(books, year);
  const chartData = useMemo(() => {
    return booksPerMonth(books, year);
  }, [books, year]);

  return (
    <div>
      <h1>📊 My Dashboard</h1>

      <div style={{ display: "flex", gap: 20 }}>
        <SummaryCard title="Books" value={totalBooks(books)} />
        <SummaryCard title="Pages" value={totalPages(books)} />
        <SummaryCard title="Avg Rating" value={averageRating(books)} />
      </div>

      <h2>Books per Month</h2>
      <div style={{ marginBottom: 12 }}>
        <label>
          Year:&nbsp;
          <select value={year} onChange={e => setYear(Number(e.target.value))}>
            {years.map(y => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
      </div>
      
      <BooksPerMonthChart data={chartData} />

      <GoalProgress current={totalBooksByYear(books, year)} goal={goal} />
    </div>
  );
}