import React from 'react';
import './ShowCard.css';

const ShowCard = ({ movie, startTime, endTime, availableSeats, bookedSeats, roomNumber, pricePerSeat }) => {
 
  const { title, posterUrl } = movie;

  return (
    <div className="show-card">
     
      <p><strong>Start Time:</strong> {new Date(startTime).toUTCString()}</p>
      <p><strong>End Time:</strong> {new Date(endTime).toUTCString()}</p>
      <p><strong>Room Number:</strong> {roomNumber}</p>
      <p><strong>Price per Seat:</strong> ${pricePerSeat}</p>
      <p><strong>Available Seats:</strong> {availableSeats.length}</p>
      <p><strong>Booked Seats:</strong> {bookedSeats.length}</p>
    </div>
  );
};

export default ShowCard;
