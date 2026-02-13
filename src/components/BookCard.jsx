export default function BookCard({ book, onAdd }) {
  return (
    // <div style={{
    //   flex: 1,
    //   background: "#f5f5f5",
    //   padding: 20,
    //   borderRadius: 12,
    //   minWidth: 80,
    //   textAlign: "center",
    //   boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
    // }}>
    <div className="summary-card">
      <img
        src={book.thumbnail || "/no-cover.png"}
        alt={book.title}
      ></img>

      <div className="book-card-content">
        <h3>{book.title}</h3>

        {book.authors.length > 0 && (
          <p>{book.authors.join(", ")}</p>
        )}

        {book.publishedDate && (
          <small>{book.publishedDate}</small>
        )}

        {onAdd && (
          <button onClick={() => onAdd(book)}>
            ➕ Add
          </button>
        )}
      </div>
    </div>
  );
}