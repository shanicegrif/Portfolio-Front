import { Link } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
        <Link to="/movies">
        <h1 className="navLink-home">FlickFleet</h1>
      </Link>

      <button
        className="navbar-toggler bg-light" style={{marginRight:"20px", color:"#f1916d"}} onClick={toggleSidebar} >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className={`collapse navbar-collapse ${sidebarOpen ? "show" : ""}`}
        id="navbarNav"
      >
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link" style={{ color: "#f1916d" }}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/movies/new" className="nav-link" style={{ color: "#f1916d" }}>
              Add New Movie
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
