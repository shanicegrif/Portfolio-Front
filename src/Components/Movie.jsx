import React from "react";
import { Link } from "react-router-dom";

const Movie = ({ movie, id }) => {
  const { title, genre, duration, rating, has_emmy } =
    movie;
  return (
    <div className="movie-card">
      <aside className="movie-info">
        <h3> <Link to={`/movies/${id}`}>{title}</Link> </h3>
        <p>Duration: {duration} mins</p>
        <p>Genre: {genre}</p>
        <p>Rating: {rating}</p>
        <p>Emmy: {has_emmy ? (<span>🏆</span>) : (<span>❌</span>)}</p>
      </aside>
    </div>
  );
};

export default Movie;
