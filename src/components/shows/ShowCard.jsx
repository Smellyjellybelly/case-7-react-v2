import React from 'react';
import './ShowCard.css';

const ShowCard = ({ movie, startTime, endTime, availableSeats, bookedSeats, roomNumber, pricePerSeat }) => {

  const { title, posterUrl } = movie;

  return (
    <div className="show-card">

      <p><ion-icon name="time"></ion-icon> {new Date(startTime).toUTCString()}</p>
      <p><ion-icon name="laptop-outline"></ion-icon> {roomNumber}</p>
      <p><ion-icon name="card"></ion-icon> {pricePerSeat}</p>
      <p><ion-icon name="person-outline"></ion-icon> {availableSeats.length}</p>
      <p><ion-icon name="person"></ion-icon> {bookedSeats.length}</p>
    </div>
  );
};

export default ShowCard;
