
import React, { useState } from 'react';
import './MovieCard.css';
import EditMovieForm from '../editmovieform/EditMovieForm';

const Movies = ({ movies = [], onMovieClick }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = (movie) => {
    setSelectedMovie(movie);
    setIsEditing(true);
  };

  const handleMovieUpdated = (updatedMovie) => {
    // Handle the updated movie data here (e.g., update the state, re-render)
    setIsEditing(false); // Close the form after updating
  };
  return (
    <div className='movie-div'>
      <div className="movies-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie._id}
              className="movie-card"
              onClick={() => onMovieClick(movie._id)} // Call when a movie is clicked
              style={{ cursor: 'pointer' }} // Add a pointer to indicate clickable
            >
              <img src={movie.posterUrl} alt={`${movie.title} poster`} className="movie-poster" />
            </div>
          ))
        ) : (
          <p>No movies available</p> // Fallback if the array is empty
        )}
      </div>
      <div>
        {isEditing && selectedMovie ? (
          <EditMovieForm
            movieId={selectedMovie._id}
            initialMovieData={selectedMovie}
            onMovieUpdated={handleMovieUpdated}
          />
        ) : (
          <div className="movies-list">
            {movies.map((movie) => (
              <div key={movie._id}>
                <h3>{movie.title}</h3>
                <button onClick={() => handleEditClick(movie)}>Edit</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

  );
};

export default Movies;
