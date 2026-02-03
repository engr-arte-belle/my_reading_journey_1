// import books from "../data/books.json";
import { useContext } from "react";
import { BooksContext } from "../context/BooksContext";

export default function Timeline() {
  const { books } = useContext(BooksContext);

  // Sort by endDate safely
  const sorted = [...books]
    .filter(b => b.endDate) // remove books without date
    .sort((a, b) => new Date(a.endDate) - new Date(b.endDate)
  );

  return (
    <div>
      <h1>📅 Timeline</h1>

      <ul>
        {sorted.map (b => (
          <li key={b.id}>
            {b.endDate} - {b.title}
          </li>
        ))}
      </ul>
    </div>
  );
}