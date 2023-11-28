import { useEffect, useState } from "react";
import Movie from "./Movie";
const API = import.meta.env.VITE_BASE_URL;

const Index = () => {
  const [movies, setMovies] = useState([]);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetch(`${API}/movies`)
      .then((res) => res.json())
      .then((moviesData) => {
        setMovies(moviesData);
      })
      .catch((error) => {
        console.error("Error fetching data.", error);
      });
  }, []);

  const handleOrderChange = (newOrder) => {
    setOrder(newOrder);
  };

  const orderedMovies = (movies, newOrder) => {
    if (newOrder === "MinHighLow") {
      return movies.sort((a,b) => b.duration - a.duration);
    } else if (newOrder === "MinLowHigh") {
      return movies.sort((a,b) => a.duration - b.duration);
    } else {
      return movies;
    }
  };

  const sortedMovies = orderedMovies(movies, order);

  return (
    <div className="movie-list-section">
      <div className="order-selection">
        <label>Order by</label>
        <select value={order} onChange={(e) => handleOrderChange(e.target.value)}>
          <option value="">--Select Order--</option>
          <option value="MinHighLow">High to Low</option>
          <option value="MinLowHigh">Low to High</option>
        </select>
      </div>
      <div className="movies-list">
        {sortedMovies.map((movie) => (
          <Movie key={movie.id} id={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Index;
