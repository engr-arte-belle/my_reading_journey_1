export default function BooksTable({ books }) {
  return (
    // <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <table className="books-table">
      <thead>
        {/* <tr style={{ background: "#ddd" }}> */}
        <tr>
          <th>Title</th>
          <th>Pages</th>
          <th>Bookshelves</th>
        </tr>
      </thead>
      <tbody>
        {books.map(b => (
          <tr key={b.id}>
            <td>{b.title}</td>
            <td>{b.pages}</td>
            <td>{b.bookshelves}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}