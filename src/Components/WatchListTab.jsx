import React from "react";

const WatchListTab = ({ watchList, onClose, onMovieClick }) => {
  return (
    <div className="watch-list-side-tab">
      <button onClick={onClose} className="close-button">
        Close
      </button>
      <h2>My Watch List</h2>
      <ul>
        {watchList.map((movie) => (
          <li key={movie.id} onClick={() => onMovieClick(movie)}>
            {movie.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WatchListTab;
