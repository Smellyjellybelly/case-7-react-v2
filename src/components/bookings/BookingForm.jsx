import React, { useState } from 'react';
import './BookingForm.css';

const BookingForm = ({ show }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [email, setEmail] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [confirmationDetails, setConfirmationDetails] = useState(null);

  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat)); // Deselect seat
    } else {
      setSelectedSeats([...selectedSeats, seat]); // Select seat
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    const bookingData = {
      email,
      show: show._id,
      seats: selectedSeats,
      bookingTime: new Date().toISOString(),
      totalPrice: selectedSeats.length * show.pricePerSeat
    };

    try {
      const response = await fetch('https://cinema-api.henrybergstrom.com/api/v1/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });

      if (response.ok) {
        setIsBooked(true);
        setConfirmationDetails({
          movieTitle: show.movie.title,
          startTime: new Date(show.startTime).toLocaleString(),
          totalPrice: bookingData.totalPrice
        });
      } else {
        console.error('Failed to book');
      }
    } catch (error) {
      console.error('Error during booking:', error);
    }
  };

  if (isBooked && confirmationDetails) {
    return (
      <div className="book-conf">
        <h2>Booking Confirmed!</h2>
        <p><strong>Movie:</strong> {confirmationDetails.movieTitle}</p>
        <p><strong>Show Time:</strong> {confirmationDetails.startTime}</p>
        <p><strong>Total Price:</strong> ${confirmationDetails.totalPrice}</p>
      </div>
    );
  }

  return (
    <div className="b-form-div">
      <h2>Booking for {show.movie.title}</h2>
      <p><strong>Time:</strong> {new Date(show.startTime).toLocaleString()}</p>
      <p><strong>Price per Seat:</strong> ${show.pricePerSeat}</p>
      <div className="seat-selection">
        <h3>Select Seats:</h3>
        <div className="seat-rows">
          <div className="seat-row">
            <strong>Row A: </strong>
            {['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9'].map(seat => (
              <button
                key={seat}
                className={`seat ${show.bookedSeats.includes(seat) ? 'booked' : ''} ${selectedSeats.includes(seat) ? 'selected' : ''}`}
                onClick={() => handleSeatClick(seat)}
                disabled={show.bookedSeats.includes(seat)}
              >
                {seat}
              </button>
            ))}
          </div>
          <div className="seat-row">
            <strong>Row B: </strong>
            {['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9'].map(seat => (
              <button
                key={seat}
                className={`seat ${show.bookedSeats.includes(seat) ? 'booked' : ''} ${selectedSeats.includes(seat) ? 'selected' : ''}`}
                onClick={() => handleSeatClick(seat)}
                disabled={show.bookedSeats.includes(seat)}
              >
                {seat}
              </button>
            ))}
          </div>
        </div>
      </div>
      <form onSubmit={handleBooking}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Selected Seats: {selectedSeats.join(', ') || 'None'}</label>
        </div>
        <button className='back-button' type="submit" disabled={selectedSeats.length === 0}>
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
