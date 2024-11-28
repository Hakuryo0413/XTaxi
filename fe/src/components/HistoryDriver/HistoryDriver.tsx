import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HistoryDriver.css';

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
    status: 'completed',
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

const HistoryDriver: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>(initialTrips);
  const navigate = useNavigate();

  const handlePayment = (trip: Trip) => {
    navigate('/driver/HistoryDriver', { state: { trip } });
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
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip.id}>
              <td>{trip.startLocation}</td>
              <td>{trip.endLocation}</td>
              <td>{trip.fare.toLocaleString()}</td>
              <td>{trip.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryDriver;
