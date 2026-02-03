import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    // <div style={{ width: 200, background: "#111", color: "white", height: "100vh", padding: 20 }}>
    <aside className="sidebar">
      <h2>📚 Journey</h2>
      <p><Link to="/" style={{ color: "white" }}>Dashboard</Link></p>
      <p><Link to="/books" style={{ color: "white" }}>Books</Link></p>
      <p><Link to="/timeline" style={{ color: "white" }}>Timeline</Link></p>
    </aside>
    // </div>
  );
}