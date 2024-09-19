import React from 'react';
import './MovieCard.css';

const Movies = ({ movies, onMovieClick }) => {
  return (
    <div className='movie-div'>
      <div className="movies-list">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="movie-card"
            onClick={() => onMovieClick(movie._id)} // Call when a movie is clicked
            style={{ cursor: 'pointer' }} // Add a pointer to indicate clickable
          >
            <img src={movie.posterUrl} alt={`${movie.title} poster`} className="movie-poster" />
          
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
