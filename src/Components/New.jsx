import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
const API = import.meta.env.VITE_BASE_URL;

const New = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [errorTwo, setErrorTwo] = useState(null);
  const [errorThree, setErrorThree] = useState(null);
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    release_date: "",
    genre: "",
    duration: "",
    rating: "",
    has_emmy: false,
  });

  const handleTextChange = (event) => {
    const { id, value } = event.target;

    if (id === "duration") {
      const parsedValue = parseInt(value, 10);

      if (!isNaN(parsedValue)) {
        setMovie({ ...movie, [id]: parsedValue });
      }
    } else {
      setMovie({ ...movie, [id]: value });
    }
  };

  const handleCheckboxChange = () => {
    setMovie({ ...movie, has_emmy: !movie.has_emmy });
  };

  const addMovie = () => {
    const movieWithDefaults = {
      ...movie,
      director: movie.director.trim() === "" ? "Unknown" : movie.director,
      genre: movie.genre.trim() === "" ? "Unknown" : movie.genre,
    };
    
    const httpOptions = {
      method: "POST",
      body: JSON.stringify(movieWithDefaults),
      headers: {
        "Content-type": "application/json",
      },
    };
    fetch(`${API}/movies`, httpOptions)
      .then(() => {
        alert(`${movie.title} was add to the movie list!`);
        navigate("/movies");
      })
      .catch((error) => {
        console.error("Error fetching data.", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { duration, release_date, rating } = movie;

    const parsedValue = parseInt(duration, 10);
    if (isNaN(parsedValue)) {
      setError("Duration must be a number.");
      return;
    }
    setError(null);

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(release_date)) {
      setErrorTwo("Invalid date format. Please use YYYY-MM-DD.");
      return;
    }
    setErrorTwo(null);

    const formattedRating = parseFloat(rating);
    if (
      isNaN(formattedRating) ||
      formattedRating < 0.0 ||
      formattedRating > 10.0
    ) {
      setErrorThree(
        "Invalid rating. Please enter a rating between 0.0 and 10.0"
      );
      return;
    }
    setErrorThree(null);

    addMovie();
  };

  return (
    <div className="new-movie">
      <form className="col-lg-6 offset-lg-3" onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          value={movie.title}
          type="text"
          onChange={handleTextChange}
          placeholder="Title of Movie"
          required
        />
        <label htmlFor="director">Director:</label>
        <input
          id="director"
          type="text"
          value={movie.director}
          onChange={handleTextChange}
          placeholder="Name of Director"
        />
        <label htmlFor="release_date">Release Date:</label>
        <input
          id="release_date"
          type="text"
          value={movie.release_date}
          placeholder="YYYY-MM-DD"
          onChange={handleTextChange}
          required
        />
        {errorTwo && <p style={{ color: "red" }}>{errorTwo}</p>}
        <label htmlFor="genre">Genre:</label>
        <input
          id="genre"
          type="text"
          value={movie.genre}
          onChange={handleTextChange}
        />
        <label htmlFor="duration">Duration:</label>
        <input
          id="duration"
          type="text"
          value={movie.duration}
          onChange={handleTextChange}
          placeholder="Length of Movie in minutes"
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <label htmlFor="rating">Rating:</label>
        <input
          id="rating"
          type="text"
          value={movie.rating}
          placeholder="0.0 to 10.0"
          onChange={handleTextChange}
          required
        />
        {errorThree && <p style={{ color: "red" }}>{errorThree}</p>}
        <label htmlFor="has_emmy">Emmy:</label>
        <input
          id="has_emmy"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={movie.has_emmy}
        />
        <br />

        <div className="new-movie-form-button text-center">
          <button type="submit" className="newButton">
            Create Movie
          </button>
        </div>
      </form>
      <div className="new-movie-form-button text-center">
        <button style={{ width: "140px" }}>
          <Link to={`/movies`}>Cancel</Link>
        </button>
      </div>
    </div>
  );
};

export default New;
