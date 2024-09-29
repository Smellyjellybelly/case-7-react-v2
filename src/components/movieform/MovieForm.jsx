import React, { useState } from 'react';
import './MovieForm.css';

const MovieForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [director, setDirector] = useState('');
  const [duration, setDuration] = useState(0);
  const [rating, setRating] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [isPosted, setIsPosted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const movieData = {
      title,
      description,
      genre,
      releaseDate,
      director,
      duration: parseInt(duration),
      rating,
      posterUrl,
    };

    try {
      const response = await fetch('https://cinema-api.henrybergstrom.com/api/v1/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
      });

      if (response.ok) {
        setIsPosted(true);
        setError(null);
      } else {
        throw new Error('Failed to post movie');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (isPosted) {
    return <div>Movie successfully posted!</div>;
  }

  return (
    <div className='movie-form'>
      <h2>Post a New Movie</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Genre:</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Release Date:</label>
          <input
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Director:</label>
          <input
            type="text"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Duration (minutes):</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Rating:</label>
          <input
            type="text"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            
          />
        </div>
        <div>
          <label>Poster URL:</label>
          <input
            type="url"
            value={posterUrl}
            onChange={(e) => setPosterUrl(e.target.value)}
            required
          />
        </div>
        <button className='back-button' type="submit">Post Movie</button>
      </form>
    </div>
  );
};

export default MovieForm;
