import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LocationDriver.css';

interface Location {
  address: string;
  lat: number;
  lng: number;
}

interface Trip {
  id: number;
  name: string;
  phone: string;
  location: Location; // Updated to use the Location type
  status: string; // e.g., "accepted", "completed", etc.
}

const initialTrips: Trip[] = [
  {
    id: 1,
    name: 'Thanh Tung Hoang',
    phone: '09863898686',
    location: {
      address: 'Hà Nội',
      lat: 21.028511,
      lng: 105.804817,
    },
    status: 'accepted',
  }
  // Add more trips as needed
];

const LocationDriver: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>(initialTrips);
  const navigate = useNavigate();

  const handleLocation = (trip: Trip) => {
    navigate('/locationMap', { state: { location: trip.location } }); // Pass location to LocationMap
  };

  return (
    <div className="history-trip-container">
      <table className="trip-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip.id}>
              <td>{trip.name}</td>
              <td>{trip.phone}</td>
              <td>{trip.location.address}</td>
              <td>{trip.status}</td>
              <td>
                {trip.status === 'accepted' && (
                  <button
                    className="pay-button"
                    onClick={() => handleLocation(trip)}
                  >
                    Location
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

export default LocationDriver;
