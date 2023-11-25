import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
const API = import.meta.env.VITE_BASE_URL;

const Update = () => {
  let { id } = useParams();
  const navigate = useNavigate();

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
    setMovie({ ...movie, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setMovie({ ...movie, has_emmy: !movie.has_emmy });
  };

  const updateMovie = () => {
    const httpOptions = {
      method: "PUT",
      body: JSON.stringify(movie),
      headers: {
        "Content-type": "application/json",
      },
    };
    fetch(`${API}/movies/${id}`, httpOptions)
      .then(() => {
        alert(`${movie.title} has been updated!`);
        navigate(`/movies/${id}`);
      })
      .catch((error) => {
        console.error("Error fetching data.", error);
      });
  };

  useEffect(() => {
    fetch(`${API}/movies/${id}`)
    .then((res) => res.json())
    .then((movieData) => {
        setMovie(movieData)
    })
    .catch((error) => {
        console.error("Error fetching data.", error);
      });
  }, [id, navigate])

  const handleSubmit = (event) => {
    event.preventDefault();
    updateMovie();
  };

  return (
    <div className="update-movie">
      <form onSubmit={handleSubmit}>
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
          required
        />
        <label htmlFor="release_date">Release Date:</label>
        <input
          id="release_date"
          type="text"
          value={movie.release_date}
          placeholder="YY-MM-DD"
          onChange={handleTextChange}
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
          value={movie.time}
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
        />
        <label htmlFor="has_emmy">Emmy:</label>
        <input
          id="has_emmy"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={movie.has_emmy}
        />
        <br />

        <button type="submit" className="newButton">
          Update Movie
        </button>
      </form>
      <Link to={`/movies/${id}`}>
        <button>Cancel</button>
      </Link>
    </div>
  );
};

export default Update;
