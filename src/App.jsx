import React, { useState, useEffect } from 'react';
import Movies from './components/movies/MovieCard';
import Shows from './components/shows/Shows';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import './app.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]); // To store filtered movies
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch('https://cinema-api.henrybergstrom.com/api/v1/movies');
      const data = await response.json();
      setMovies(data);
      setFilteredMovies(data); // Initialize filtered movies with all movies
      setLoading(false);
    };

    fetchMovies();
  }, []);

  const handleMovieClick = (movieId) => {
    setSelectedMovieId(movieId);
  };

  const handleBackClick = () => {
    setSelectedMovieId(null);
  };

  const handleSearch = (searchTerm) => {
    // Filter movies based on the search term
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  if (loading) {
    return <p>Loading movies...</p>;
  }

  return (
    <div className="App">
      <Header onSearch={handleSearch} /> 
      {selectedMovieId ? (
        <>
          <button onClick={handleBackClick} className="back-button">Back to Movies</button>
          <Shows movieId={selectedMovieId} />
        </>
      ) : (
        <Movies movies={filteredMovies} onMovieClick={handleMovieClick} /> // Use filteredMovies
      )}
      <Footer />
    </div>
  );
}

export default App;
