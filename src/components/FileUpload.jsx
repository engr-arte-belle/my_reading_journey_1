import { useContext } from "react";
import { BooksContext } from "../context/BooksContext";

import Papa from "papaparse";
// import Books from "../pages/Books";

// export default function FileUpload({ onData }) {
//   function handleFile(event) {
//     const file = event.target.files[0];
//     if (!file) return;

//     Papa.parse(file, {
//       header: true,
//       skipEmptyLines: true,
//       complete: results => {
//         console.log("Parsed CSV:", results.data);
//         onData(results.data);
//       }
//     });
//   }

//   return <input type="file" accept=".csv" onChange={handleFile} />;
// }

function FileUpload() {
  const { setBooks } = useContext(BooksContext);

  function handleFile(e) {
    const file = e.target.files[0];

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const converted = results.data
          .filter(b => b.Title) // remove empty rows
          .map(b => ({
            id: b["Book Id"], // Goodreads unique id
            title: b.Title,
            author: b.Author,
            pages: Number(b["Number of Pages"]) || 0,
            bookshelves: b.Bookshelves || "Unknown",
            endDate: b["Date Read"] || null,
            rating: b["Average Rating"] || null
          }));
        console.log("Converted books:", converted);
        setBooks(converted) // GLOBAL DATA UPDATE
      }
    });
  }

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFile} />
    </div>
  );
}

export default FileUpload;