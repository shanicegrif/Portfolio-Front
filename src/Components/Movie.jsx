import React from "react";
import { Link } from "react-router-dom";

const Movie = ({ movie, id, addToWatchlist }) => {
  const { title, genre, duration, rating, has_emmy } = movie;

  const handleAddToWatchlist = () => {
    addToWatchlist(movie);
  };
  return (
    <article className="movie-card">
      <aside className="movie-card-info">
        <h3>
          <Link to={`/movies/${id}`}>{title}</Link>{" "}
        </h3>
        <p>Duration: {duration} mins</p>
        <p>Genre: {genre}</p>
        <p>Rating: {rating}</p>
        <p>Emmy: {has_emmy ? <span>🏆</span> : <span>❌</span>}</p>
      </aside>
      <div className="movie-card-buttons text-center">
        <button className="btn btn-primary" onClick={handleAddToWatchlist}>➕ WatchList</button>
      </div>
    </article>
  );
};

export default Movie;
