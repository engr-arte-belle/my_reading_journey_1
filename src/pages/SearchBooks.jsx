import { useState, useRef } from "react";
import BookCard from "../components/BookCard";

const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

function BookResult({ book, onAdd }) {
  const info = book.volumeInfo;

  return (
    <div>
      <img src={info.imageLinks?.thumbnail} alt={info.title}></img>

      <div>
        <h3>{info.title}</h3>
        <p>{info.authors?.join(", ")}</p>
        <small>{info.publishedDate}</small>
      </div>
    </div>
  );
}

function normalizeGoogleBook(book) {
  const info = book.volumeInfo;

  return {
    googleId: book.id,
    title: info.title ?? "", 
    authors: info.authors ?? [],
    thumbnail: info.imageLinks?.thumbnail ?? null,
    description: info.description ?? "",
    pageCount: info.pageCount ?? null,
    publishedDate: info.publishedDate ?? null,
    isbn: info.industryIdentifiers?.find(i => i.type === "ISBN_13")?.identifier 
      ?? info.industryIdentifiers?.[0]?.identifier ?? null
  }
}

export default function SearchBooks() {
  // console.log("API KEY:", API_KEY);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);

  const cacheRef = useRef({});

  async function searchBooks() {
    console.count("searchBooks called");
    if (loading) return;  // prevents double-firing search request
    if (!query.trim()) return;

    // Cache check
    if (cacheRef.current[query]) {
      setResults(cacheRef.current[query]);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query
        )}&maxResults=10&printType=books&key=${API_KEY}`
      );

      if (res.status === 429) {
        throw new Error("RATE_LIMIT")
      }
      if (!res.ok) throw new Error("API_ERROR");

      const data = await res.json();
      console.log(data);
      const items = data.items || [];

      // Save to cache
      cacheRef.current[query] = items;

      setResults(items);
      setLoading(false);
    } catch (err) {
      console.error(err);
      if (err.message === "RATE_LIMIT") {
        setError("Too many requests. Please wait a moment and try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  function addBook(googleBook) {
    // const normalized = normalizeGoogleBook(googleBook);

    // setBooks(prev => [...prev, googleBook]);

    setBooks((prev) => {
      const exists = prev.some(b => b.id === googleBook.id);
      if (exists) return prev;  // prevent duplicates
      return [...prev, googleBook];
    })
  }

  return (
    <div>
      <h1>🔍 Search</h1>

      <div>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by title, author, ISBN..."
        />
        <button onClick={searchBooks} disabled={loading}>Search</button>
      </div>

      {loading && <p>Searching...</p>}

      {/* {!loading && results.length === 0 && query && (
        <p>No results found.</p>
      )} */}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="books-grid">
        {/* {results.map(book => (
          <BookResult key={book.id} book={book} onAdd={addBook} />
        ))} */}
        {results.map(book => {
          const normalized = normalizeGoogleBook(book);

          return (
            <BookCard
              key={normalized.googleId}
              book={normalized}
              onAdd={addBook}
            />
          );
        })}
      </div>

      {/* Show added books under search results */}
      {books.length > 0 && (
        <div>
          <h2>📚 Added</h2>
          <div className="books-grid">
            {books.map(book => (
              <BookCard
                key={book.googleId}
                book={book}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}