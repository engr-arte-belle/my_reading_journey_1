// import books from "../data/books.json";
import { useContext } from "react";
import { useState, useMemo } from "react";
import { BooksContext } from "../context/BooksContext";

import { 
  totalBooks, 
  totalPages, 
  averageRating, 
  totalBooksByYear, 
  totalPagesByYear, 
  booksPerMonth, 
  averageRatingByYear,
  totalAuthorsByYear
} from "../utils/analytics";

import FileUpload from "../components/FileUpload";
import SummaryCard from "../components/SummaryCard";
import BooksPerMonthChart from "../components/BooksPerMonthChart";
import GoalProgress from "../components/GoalProgress";

export default function Dashboard() {
  const { books } = useContext(BooksContext);

  const goal = 52; // later load from settings
  // const year = 2026;
  // const [year, setYear] = useState(new Date().getFullYear());
  const [year, setYear] = useState("all");

  const years = useMemo(() => {
    return [...new Set(
      books.filter(b => b.endDate).map(b => new Date(b.endDate).getFullYear())
    )].sort((a, b) => b - a);
  }, [books]);

  // const chartData = booksPerMonth(books, year);
  // const chartData = useMemo(() => {
  //   return year === "all" ? booksPerMonth(books, year) : booksPerMonth(books, year);
  // }, [books, year]);
  const chartData = booksPerMonth(books, year);

  const disableYearSelect = year.length <= 1;

  return (
    <div>
      <h1>📊 My Dashboard</h1>

      <h3>Upload GR CSV</h3>
      <FileUpload />

      <div style={{ marginBottom: 12 }}>
        <label>
          Year:&nbsp;
          <select 
            value={year}
            disabled={disableYearSelect}
            onChange={e => setYear(
              e.target.value === "all" ? "all" : Number(e.target.value)
            )}
          >
            <option value="all">All years</option>
            {years.map(y => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div style={{ display: "flex", gap: 20 }}>
        <SummaryCard title="Books" value={totalBooksByYear(books, year)} />
        <SummaryCard title="Pages" value={totalPagesByYear(books, year).toLocaleString()} />
        <SummaryCard title="Avg Rating" value={averageRatingByYear(books, year)} />
        <SummaryCard title="Authors" value={totalAuthorsByYear(books, year)} />
      </div>

      <h2>Books per Month</h2>
      <BooksPerMonthChart data={chartData} />

      {year !== "all" && (
        <GoalProgress current={totalBooksByYear(books, year)} goal={goal} />
      )}

    </div>
  );
}