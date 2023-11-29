import { useEffect, useState } from "react";
import { useWatchlist } from "./WatchlistContext";
import Movie from "./Movie";
const API = import.meta.env.VITE_BASE_URL;

const Index = () => {
  const [movies, setMovies] = useState([]);
  const [order, setOrder] = useState("");
  const [watchlistOpen, setWatchlistOpen] = useState(false);
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  const toggleWatchlist = () => {
    setWatchlistOpen(!watchlistOpen);
  };

  useEffect(() => {
    fetch(`${API}/movies`)
      .then((res) => res.json())
      .then((moviesData) => {
        setMovies(moviesData);
      })
      .catch((error) => {
        console.error("Error fetching data.", error);
      });
  }, [watchlist]);

  const handleOrderChange = (newOrder) => {
    setOrder(newOrder);
  };

  const orderedMovies = (movies, newOrder) => {
    if (newOrder === "MinHighLow") {
      return movies.sort((a, b) => b.duration - a.duration);
    } else if (newOrder === "MinLowHigh") {
      return movies.sort((a, b) => a.duration - b.duration);
    } else if (newOrder === "RateHighLow") {
      return movies.sort((a, b) => b.rating - a.rating);
    } else if (newOrder === "RateLowHigh") {
      return movies.sort((a, b) => a.rating - b.rating);
    } else {
      return movies;
    }
  };

  const sortedMovies = orderedMovies(movies, order);

  return (
    <div className="movie-list-section">
      <div className="order-selection">
        <label>Order by</label>
        <select
          value={order}
          onChange={(e) => handleOrderChange(e.target.value)}
        >
          <option value="">--Select Order--</option>
          <option value="MinHighLow">Duration: High to Low</option>
          <option value="MinLowHigh">Duration: Low to High</option>
          <option value="RateHighLow">Rating: High to Low</option>
          <option value="RateLowHigh">Rating: Low to High</option>
        </select>
      </div>
      <div className="movie-list-watchlist">
        <div className={`watchlist ${watchlistOpen ? "open" : "closed"}`}>
          <button className="toggle-btn" onClick={toggleWatchlist}>
            {watchlistOpen ? "Close Watchlist" : "Open Watchlist"}
          </button>
          {watchlistOpen && watchlist.length > 0 && (
            <>
              <h4>Watchlist</h4>
              <ul>
                {watchlist.map((movie) => (
                  <li key={movie.id}>
                    {movie.title}
                    <button onClick={() => removeFromWatchlist(movie.id)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
          {watchlistOpen && watchlist.length === 0 && (
            <p>Your watchlist is empty.</p>
          )}
        </div>
      </div>
        <div className="movies-list">
          {sortedMovies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              movie={movie}
              addToWatchlist={addToWatchlist}
            />
          ))}
        </div>
    </div>
  );
};

export default Index;
