import React, { useState } from 'react';

const BookingForm = ({ show }) => {
  const [email, setEmail] = useState('');
  const [seats, setSeats] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [confirmation, setConfirmation] = useState(null);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const selectedSeats = show.availableSeats.slice(0, seats); // Select the first `seats` from availableSeats
    const bookingDetails = {
      email: email,
      show: show._id,
      seats: selectedSeats, // Array of selected seat IDs (e.g., "A1", "A2")
      bookingTime: new Date().toISOString(), // Booking time set to current time
      totalPrice: seats * show.pricePerSeat, // Calculate total price
    };

    try {
      const response = await fetch('https://cinema-api.henrybergstrom.com/api/v1/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingDetails),
      });

      if (!response.ok) {
        throw new Error('Failed to submit booking.');
      }

      const data = await response.json();
      setConfirmation(data); // Store confirmation data after successful booking
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (confirmation) {
    return (
      <div>
        <h2>Booking Confirmation</h2>
        <p>Your booking is confirmed!</p>
        <p><strong>Movie:</strong> {show.movie.title}</p>
        <p><strong>Seats:</strong> {confirmation.seats.join(', ')}</p>
        <p><strong>Total Price:</strong> ${confirmation.totalPrice}</p>
        <p><strong>Booking Time:</strong> {new Date(confirmation.bookingTime).toLocaleString()}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Booking Form</h2>
      <p><strong>Movie:</strong> {show.movie.title}</p>
      <p><strong>Start Time:</strong> {new Date(show.startTime).toLocaleString()}</p>
      <p><strong>End Time:</strong> {new Date(show.endTime).toLocaleString()}</p>
      <p><strong>Room Number:</strong> {show.roomNumber}</p>
      <p><strong>Price per Seat:</strong> ${show.pricePerSeat}</p>
      <form onSubmit={handleBookingSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Number of Seats:
          <input
            type="number"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            min="1"
            max={show.availableSeats.length}
            required
          />
        </label>
        <br />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
        </button>
        {error && <p>Error: {error}</p>}
      </form>
    </div>
  );
};

export default BookingForm;
