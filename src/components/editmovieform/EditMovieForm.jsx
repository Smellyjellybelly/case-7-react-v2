import React, { useState, useEffect } from 'react';

const EditMovieForm = ({ movieId, initialMovieData, onMovieUpdated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    releaseDate: '',
    director: '',
    duration: 0,
    rating: '',
    posterUrl: ''
  });

  useEffect(() => {
    if (initialMovieData) {
      setFormData({
        title: initialMovieData.title,
        description: initialMovieData.description,
        genre: initialMovieData.genre,
        releaseDate: initialMovieData.releaseDate,
        director: initialMovieData.director,
        duration: initialMovieData.duration,
        rating: initialMovieData.rating,
        posterUrl: initialMovieData.posterUrl
      });
    }
  }, [initialMovieData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`https://cinema-api.henrybergstrom.com/api/v1/movies/${movieId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedMovie = await response.json();
        onMovieUpdated(updatedMovie); // Notify the parent component about the update
        alert('Movie updated successfully!');
      } else {
        alert('Failed to update the movie.');
      }
    } catch (error) {
      console.error('Error while updating the movie:', error);
      alert('An error occurred while updating the movie.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Movie</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Genre:</label>
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Release Date:</label>
        <input
          type="date"
          name="releaseDate"
          value={formData.releaseDate}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Director:</label>
        <input
          type="text"
          name="director"
          value={formData.director}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Duration (minutes):</label>
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Rating:</label>
        <input
          type="text"
          name="rating"
          value={formData.rating}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Poster URL:</label>
        <input
          type="text"
          name="posterUrl"
          value={formData.posterUrl}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">Update Movie</button>
    </form>
  );
};

export default EditMovieForm;
