import React, { useState } from 'react';

const BookingForm = ({ show }) => {
  const [email, setEmail] = useState('');
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [confirmation, setConfirmation] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      email: email,
      show: show._id,
      seats: Array.from({ length: numberOfSeats }, (_, i) => `Seat ${i + 1}`), // For now, we generate seats dynamically
      totalPrice: numberOfSeats * show.pricePerSeat,
    };

    try {
      const response = await fetch('https://cinema-api.henrybergstrom.com/api/v1/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const result = await response.json();
        setConfirmation(result);
      } else {
        console.error('Failed to submit booking.');
      }
    } catch (error) {
      console.error('Error during booking submission:', error);
    }
  };

  return (
    <div>
      {confirmation ? (
        <div>
          <h2>Booking Confirmation</h2>
          <p><strong>Movie Title:</strong> {show.movie.title}</p>
          <p><strong>Date:</strong> {new Date(show.startTime).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {new Date(show.startTime).toLocaleTimeString()}</p>
          <p><strong>Seats:</strong> {confirmation.seats.join(', ')}</p>
          <p><strong>Total Price:</strong> ${confirmation.totalPrice}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Book Your Seats for {show.movie.title}</h2>
          <p><strong>Date:</strong> {new Date(show.startTime).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {new Date(show.startTime).toLocaleTimeString()}</p>
          <p><strong>Room:</strong> {show.roomNumber}</p>
          <p><strong>Price per Seat:</strong> ${show.pricePerSeat}</p>

          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Number of Seats:
            <input
              type="number"
              value={numberOfSeats}
              onChange={(e) => setNumberOfSeats(e.target.value)}
              min="1"
              max={show.availableSeats.length}
              required
            />
          </label>

          <button type="submit">Book Now</button>
        </form>
      )}
    </div>
  );
};

export default BookingForm;
