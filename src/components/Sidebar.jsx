import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Sidebar() {
  const {theme, mode, toggleManualTheme, useSystemTheme} = useTheme();

  return (
    // <div style={{ width: 200, background: "#111", color: "white", height: "100vh", padding: 20 }}>
    <aside className="sidebar">
      <h2>📚 Journey</h2>
      <p><Link to="/" style={{ color: "white" }}>Dashboard</Link></p>
      <p><Link to="/books" style={{ color: "white" }}>Books</Link></p>
      <p><Link to="/timeline" style={{ color: "white" }}>Timeline</Link></p>
      <p><Link to="/search" style={{ color: "white" }}>Search</Link></p>

      <hr></hr>

      <div>
        <h4>Appearance</h4>

        <button onClick={toggleManualTheme}>
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>

        <button onClick={useSystemTheme}>
          🖥 System Theme
        </button>

        <small>
          Mode: <strong>{mode}</strong>
        </small>
      </div>
    </aside>
    // </div>
  );
}