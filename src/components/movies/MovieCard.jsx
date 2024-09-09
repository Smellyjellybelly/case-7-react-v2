import React from 'react';
import './MovieCard.css';

const Movies = ({ movies }) => {
  return (
    <div>
      <h1>Movies</h1>
      <div className="movies-list">
        {movies.map(movie => (
          <div key={movie.title} className="movie-card">
            <img src={movie.posterUrl} alt={`${movie.title} poster`} className="movie-poster" />
            <div className="movie-info">
              <h2>{movie.title}</h2>
              <p><strong>Description:</strong> {movie.description}</p>
              <p><strong>Genre:</strong> {movie.genre}</p>
              <p><strong>Release Date:</strong> {new Date(movie.releaseDate).toDateString()}</p>
              <p><strong>Director:</strong> {movie.director}</p>
              <p><strong>Duration:</strong> {movie.duration} minutes</p>
              <p><strong>Rating:</strong> {movie.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Movies;
