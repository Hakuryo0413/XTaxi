import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HistoryTrip.css';

interface Trip {
  id: number;
  startLocation: string;
  endLocation: string;
  fare: number; // in VND
  status: string; // e.g., "accepted", "completed", etc.
}

const initialTrips: Trip[] = [
  {
    id: 1,
    startLocation: 'Hanoi Old Quarter',
    endLocation: 'Noi Bai Airport',
    fare: 250000,
    status: 'accepted',
  },
  {
    id: 2,
    startLocation: 'Vincom Center',
    endLocation: 'Times City',
    fare: 50000,
    status: 'completed',
  },
  // Add more trips as needed
];

const HistoryTrip: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>(initialTrips);
  const navigate = useNavigate();

  const handlePayment = (trip: Trip) => {
    navigate('/payment', { state: { trip } });
  };

  return (
    <div className="history-trip-container">
      <table className="trip-table">
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Fare (VND)</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip.id}>
              <td>{trip.startLocation}</td>
              <td>{trip.endLocation}</td>
              <td>{trip.fare.toLocaleString()}</td>
              <td>{trip.status}</td>
              <td>
                {trip.status === 'accepted' && (
                  <button
                    className="pay-button"
                    onClick={() => handlePayment(trip)}
                  >
                    Pay
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTrip;
