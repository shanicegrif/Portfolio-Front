import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Index from "./Components/Index";
import New from "./Components/New";
import Show from "./Components/Show";
import Update from "./Components/Update";
const API = import.meta.env.VITE_BASE_URL;

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Index />} />
            <Route path="/movies/new" element={<New />} />
            <Route path="/movies/:id" element={<Show />} />
            <Route path="/movies/:id/edit" element={<Update />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
