import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useWatchlist } from "./WatchlistContext";
const API = import.meta.env.VITE_BASE_URL;

const Show = () => {
  const [movie, setMovie] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [watchlistOpen, setWatchlistOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const { title, director, release_date, genre, duration, rating, has_emmy } =
    movie;

  const toggleWatchlist = () => {
    setWatchlistOpen(!watchlistOpen);
    if (watchlistOpen) {
      setErrorMessage("");
    }
  };

  const isInWatchlist = (movieId) => {
    return watchlist.some((movie) => movie.id === movieId);
  };

  const handleAddToWatchlist = (movie) => {
    if (isInWatchlist(movie.id)) {
      setErrorMessage("This movie is already in your watchlist!");
    } else {
      addToWatchlist(movie);
      setErrorMessage("");
    }
  };

  useEffect(() => {
    fetch(`${API}/movies/${id}`)
      .then((res) => res.json())
      .then((movieData) => {
        setMovie(movieData);
      })
      .catch((error) => {
        console.error("Error fetching data.", error);
      });
  }, [id, navigate]);

  const handleDelete = () => {
    deleteMovie();
  };

  const deleteMovie = () => {
    const httpOptions = { method: "DELETE" };
    fetch(`${API}/movies/${id}`, httpOptions)
      .then(() => {
        alert(`${movie.title} was deleted!`);
        navigate("/movies");
      })
      .catch((error) => {
        console.error("Error fetching data.", error);
      });
  };

  return (
    <div>
      <div className="show-movie">
        <div className="show-watchlist">
          <div className={`watchlist ${watchlistOpen ? "open" : "closed"}`}>
            <button className="toggle-btn" onClick={toggleWatchlist}>
              {watchlistOpen ? "Close Watchlist" : "Open Watchlist"}
            </button>
            {watchlistOpen && watchlist.length > 0 && (
              <div className="watchlist-info">
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
              </div>
            )}
            {watchlistOpen && watchlist.length === 0 && (
              <p>Your watchlist is empty.</p>
            )}
            {errorMessage && (
              <div style={{ color: "red", marginTop: "10px" }}>
                {errorMessage}
              </div>
            )}
          </div>
        </div>
        <div className="show-movie-card">
          <aside className="show-movie-card-info">
            <h4>{title}</h4>
            <p>Director: {director}</p>
            <p>Release Date: {release_date}</p>
            <p>Duration: {duration} mins</p>
            <p>Genre: {genre}</p>
            <p>Rating: {rating}</p>
            <p>Emmy: {has_emmy ? <span>🏆</span> : <span>❌</span>}</p>
          </aside>
          <div className="movie-card-buttons text-center">
            <button className="btn btn-primary" onClick={handleAddToWatchlist}>
              ➕ WatchList
            </button>
          </div>
        </div>
        <div className="show-movie-buttons">
          <div>
            <Link to={`/movies`}>
              <button>Cancel</button>
            </Link>
          </div>
          <div>
            <Link to={`/movies/${id}/edit`}>
              <button>Edit</button>
            </Link>
          </div>
          <div>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Show;
