import React, { useState, useEffect } from 'react';
import ShowCard from './ShowCard';

const Shows = ({ movieId }) => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchShows = async () => {
      try {
        const response = await fetch(`https://cinema-api.henrybergstrom.com/api/v1/shows/movie/${movieId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch shows.');
        }
        const data = await response.json();
        setShows(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, [movieId]);

  if (loading) {
    return <p>Loading shows...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {shows.length > 0 ? (
        shows.map((show) => (
          <ShowCard
            key={show._id}
            movie={show.movie}
            startTime={show.startTime}
            endTime={show.endTime}
            availableSeats={show.availableSeats}
            bookedSeats={show.bookedSeats}
            roomNumber={show.roomNumber}
            pricePerSeat={show.pricePerSeat}
          />
        ))
      ) : (
        <p>No shows available for this movie.</p>
      )}
    </div>
  );
};

export default Shows;
