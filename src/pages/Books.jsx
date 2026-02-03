// import books from "../data/books.json";
// import initialBooks from "../data/books.json"
import { useContext } from "react";
import { BooksContext } from "../context/BooksContext";

import { useState } from "react";
import BooksTable from "../components/BooksTable";
import FileUpload from "../components/FileUpload";

export default function Books() {
  // const [books, setBooks] = useState(initialBooks)
  const { books } = useContext(BooksContext);

  const [search, setSearch] = useState("");
  const [bookshelf, setBookshelf] = useState("All");
  const [sort, setSort] = useState("title");

  // Filter by title
  let filtered = books.filter(b =>
    (b.title || "").toLowerCase().includes(search.toLowerCase())
  );

  // Filter by bookshelf
  if (bookshelf !== "All") {
    filtered = filtered.filter(b => (b.bookshelves || "Unknown") === bookshelf);
  }

  // Sort
  filtered.sort((a, b) => {
    if (sort === "title") return (a.title || "").localeCompare(b.title || "");
    if (sort === "pages") return (b.pages || 0) - (a.pages || 0);
    return 0;
  });

  // Dropdown list
  const bookshelfOptions = ["All", ...new Set(books.map(b => b.bookshelves || "Unknown"))];

  return (
    <div>
      <h1>📚 My Library</h1>

      <h3>Upload GR CSV</h3>
      <FileUpload />

      {/* Controls */}
      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <input
          placeholder="Search title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select value={bookshelf} onChange={e => setBookshelf(e.target.value)}>
          {bookshelfOptions.map(g => (
            <option key={g}>{g}</option>
          ))}
        </select>

        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="title">Sort by Title</option>
          <option value="pages">Sort by Pages</option>
        </select>
      </div>

      <BooksTable books={filtered} />

      {/* <ul>
        {booksData.map(b => (
          <li key={b.id}>{b.title} - {b.pages} pages</li>
        ))}
      </ul> */}
    </div>
  );
}