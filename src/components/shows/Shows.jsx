import React, { useState, useEffect } from 'react';
import ShowCard from './ShowCard';
import BookingForm from '../bookings/BookingForm'; // Import the booking form

const Shows = ({ movieId }) => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null); // State to track selected show
  const [bookingMode, setBookingMode] = useState(false); // Track if booking form should be displayed

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

  const handleShowClick = (show) => {
    setSelectedShow(show); // Set selected show when a show is clicked
  };

  const handleBookingClick = () => {
    setBookingMode(true); // Switch to booking form mode
  };

  const handleBackClick = () => {
    setSelectedShow(null);
    setBookingMode(false); // Reset the view to the list of shows
  };

  if (loading) {
    return <p>Loading shows...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (bookingMode && selectedShow) {
    // Display the booking form for the selected show
    return (
      <div>
        <button onClick={handleBackClick}>Back to Show</button>
        <BookingForm show={selectedShow} /> {/* Pass the selected show to the form */}
      </div>
    );
  }

  if (selectedShow) {
    // Display only the selected show with a booking button
    return (
      <div>
        <button onClick={handleBackClick}>Back to Shows</button>
        <ShowCard
          key={selectedShow._id}
          movie={selectedShow.movie}
          startTime={selectedShow.startTime}
          endTime={selectedShow.endTime}
          availableSeats={selectedShow.availableSeats}
          bookedSeats={selectedShow.bookedSeats}
          roomNumber={selectedShow.roomNumber}
          pricePerSeat={selectedShow.pricePerSeat}
        />
        {/* Add the "Book Now" button */}
        <button onClick={handleBookingClick}>Book Now</button>
      </div>
    );
  }

  // Display all shows
  return (
    <div>
      {shows.length > 0 ? (
        shows.map((show) => (
          <div key={show._id} onClick={() => handleShowClick(show)}>
            <ShowCard
              movie={show.movie}
              startTime={show.startTime}
              endTime={show.endTime}
              availableSeats={show.availableSeats}
              bookedSeats={show.bookedSeats}
              roomNumber={show.roomNumber}
              pricePerSeat={show.pricePerSeat}
            />
          </div>
        ))
      ) : (
        <p>No shows available for this movie.</p>
      )}
    </div>
  );
};

export default Shows;
