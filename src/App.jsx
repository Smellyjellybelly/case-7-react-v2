import React, { useState, useEffect } from 'react';
import Movies from './components/movies/MovieCard';
import Shows from './components/shows/Shows';
import './app.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch('https://cinema-api.henrybergstrom.com/api/v1/movies');
      const data = await response.json();
      setMovies(data);
      setLoading(false);
    };

    fetchMovies();
  }, []);

  const handleMovieClick = (movieId) => {
    setSelectedMovieId(movieId);
  };

  const handleBackClick = () => {
    setSelectedMovieId(null); // Reset the selected movie
  };

  if (loading) {
    return <p>Loading movies...</p>;
  }

  return (
    <div className="App">
      {selectedMovieId ? (
        <>
          <button onClick={handleBackClick} className="back-button">Back to Movies</button>
          <Shows movieId={selectedMovieId} />
        </>
      ) : (
        <Movies movies={movies} onMovieClick={handleMovieClick} />
      )}
    </div>
  );
}

export default App;
