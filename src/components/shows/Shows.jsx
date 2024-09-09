import React from 'react';
import ShowCard from './ShowCard';
import './ShowCard.css';

const Shows = ({ shows }) => {

  return (
    <div>
      <h2>Shows</h2>
      <div className="shows-list">
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
          <p>No shows available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Shows;
