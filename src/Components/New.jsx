import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
const API = import.meta.env.VITE_BASE_URL;

const New = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
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
  
    if (id === 'duration') {
      const parsedValue = parseInt(value.match(/\d+/), 10);
  
      if (!isNaN(parsedValue)) {
        setMovie({ ...movie, [id]: parsedValue });
        setError("");
      } else {
        setError("This is not a number, try again!");
      }
    } else {
      setMovie({ ...movie, [id]: value });
    }
  };
  

  const handleCheckboxChange = () => {
    setMovie({ ...movie, has_emmy: !movie.has_emmy });
  };

  const addMovie = () => {
    const httpOptions = {
      method: "POST",
      body: JSON.stringify(movie),
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
          type="number"
          min="1" max="1000"
          value={movie.duration}
          onChange={handleTextChange}
          placeholder="Length of Movie in minutes"
        />
        <label htmlFor="rating">Rating:</label>
        <input
          id="rating"
          type="text"
          value={movie.rating}
          placeholder="0.0 to 10.0"
          onChange={handleTextChange}
          required
        />
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
          <button style={{ width: "140px" }}>
            <Link to={`/movies`}>Cancel</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default New;
