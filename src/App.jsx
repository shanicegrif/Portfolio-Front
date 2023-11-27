import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Index from "./Components/Index";
import New from "./Components/new";
import Show from "./Components/Show";
import Update from "./Components/Update";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="app">
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
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
