import { useEffect, useState } from "react";
import Movie from "./Movie";
const API = import.meta.env.VITE_BASE_URL;

const Index = () => {
  const [movies, setMovies] = useState([]);

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

  return (
    <div>
      <div className="movies-list-container">
        {movies.map((movie) => (
          <Movie key={movie.id} id={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Index;
