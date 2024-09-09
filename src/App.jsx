import React, { useEffect, useState } from 'react';
import Movies from './components/movies/MovieCard';
import Shows from './components/shows/Shows';
import Booking from './components/bookings/BookingForm';

function App() {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesResponse, showsResponse, bookingsResponse] = await Promise.all([
          fetch('https://cinema-api.henrybergstrom.com/api/v1/movies'),
          fetch('https://cinema-api.henrybergstrom.com/api/v1/shows'),
          fetch('https://cinema-api.henrybergstrom.com/api/v1/bookings')
        ]);

        const moviesData = await moviesResponse.json();
        const showsData = await showsResponse.json();
        const bookingsData = await bookingsResponse.json();

        setMovies(moviesData);
        setShows(showsData);
        setBookings(bookingsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading data...</div>;
  }

  return (
    <div className="App">
      <h1>Movies and Shows</h1>
      <Movies movies={movies} />
      <Shows shows={shows} />
     
    </div>
  );
}

export default App;
