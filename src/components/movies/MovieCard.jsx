import React from 'react';
import './MovieCard.css';

const Movies = ({ movies, onMovieClick }) => {
  return (
    <div>
      <div className="movies-list">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="movie-card"
            onClick={() => onMovieClick(movie._id)} // Call when a movie is clicked
            style={{ cursor: 'pointer' }} // Add a pointer to indicate clickable
          >
            <img src={movie.posterUrl} alt={`${movie.title} poster`} className="movie-poster" />
            <div className="movie-info">
              <h2>{movie.title}</h2>
              <p><strong>Description:</strong> {movie.description}</p>
              <p><strong>Genre:</strong> {movie.genre}</p>
              <p><strong>Release Date:</strong> {new Date(movie.releaseDate).toDateString()}</p>
              <p><strong>Director:</strong> {movie.director}</p>
              <p><strong>Duration:</strong> {movie.duration} minutes</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
