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
    const { id, value } = event.target;

    setMovie({ ...movie, [id]: value });
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
        setMovie(movieData);
      })
      .catch((error) => {
        console.error("Error fetching data.", error);
      });
  }, [id, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateMovie();
  };

  return (
    <div className="update-movie">
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
          type="text"
          value={movie.duration}
          onChange={handleTextChange}
          placeholder="Length of Movie in minutes"
          required
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
        <div className="update-movie-form-button text-center">
          <button type="submit" className="newButton">
            Update Movie
          </button>
        </div>
      </form>

      <div className="update-movie-form-button text-center">
        <button style={{ width: "140px" }}>
          <Link to={`/movies/${id}`}>Cancel</Link>
        </button>
      </div>
    </div>
  );
};

export default Update;
