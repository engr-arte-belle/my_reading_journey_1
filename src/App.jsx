import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Sidebar from "./components/Sidebar";
import Timeline from "./pages/Timeline";
import SearchBooks from "./pages/SearchBooks";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/books" element={<Books />}></Route>
            <Route path="/timeline" element={<Timeline />}></Route>
            <Route path="/search" element={<SearchBooks />}></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;